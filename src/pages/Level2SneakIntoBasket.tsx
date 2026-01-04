import { useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { GameHUD } from '@/components/GameHUD';
import { EvilMascot } from '@/components/EvilMascot';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ArrowRight, HelpCircle, Pencil, ShoppingCart, X } from 'lucide-react';

type LevelState = 'playing' | 'success' | 'fail';

interface CartItem {
  id: string;
  name: string;
  price: number;
  hidden?: boolean;
}

export function Level2SneakIntoBasket() {
  const { addPoints, loseMoneyTrap, addMistake, goToLevel } = useGame();
  const [levelState, setLevelState] = useState<LevelState>('playing');
  const [moneyLostThisLevel, setMoneyLostThisLevel] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 'tshirt', name: 'Classic T-Shirt (Size M)', price: 15 },
    { id: 'protection', name: 'Premium Handling & Protection™', price: 50, hidden: true },
  ]);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  const hasProtectionPlan = cartItems.some(item => item.id === 'protection');

  const handleRemoveProtection = () => {
    setCartItems(prev => prev.filter(item => item.id !== 'protection'));
  };

  const handleCompletePurchase = () => {
    if (hasProtectionPlan) {
      // User fell for the trap - $50 for the protection plan
      loseMoneyTrap(50);
      addMistake();
      setMoneyLostThisLevel(50);
      setLevelState('fail');
    } else {
      // User spotted and removed the sneaky item
      addPoints(100);
      setLevelState('success');
    }
  };

  const handleNextLevel = () => {
    goToLevel(3); // Proceed to Level 3
  };

  const handleRetry = () => {
    setLevelState('playing');
    setMoneyLostThisLevel(0);
    setCartItems([
      { id: 'tshirt', name: 'Classic T-Shirt (Size M)', price: 15 },
      { id: 'protection', name: 'Premium Handling & Protection™', price: 50, hidden: true },
    ]);
  };

  return (
    <div className="min-h-screen bg-background">
      <GameHUD />
      
      <div className="pt-20 p-8 flex flex-col items-center justify-center min-h-screen">
        {/* Level indicator */}
        <div className="mb-8 text-center">
          <h2 className="text-xl font-mono text-muted-foreground">LEVEL 2</h2>
          <h1 className="text-3xl font-mono font-bold text-neon-red">SNEAK INTO BASKET</h1>
          <p className="text-sm text-evil-text mt-2 italic">"What you see is definitely not what you get"</p>
        </div>

        {/* Checkout Interface */}
        {levelState === 'playing' && (
          <div className="evil-card p-6 max-w-md w-full space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border pb-4">
              <ShoppingCart className="w-6 h-6 text-neon-green" />
              <h3 className="text-xl font-mono font-bold text-foreground">Checkout Summary</h3>
            </div>

            {/* Cart Items */}
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div 
                  key={item.id}
                  className={`flex items-center justify-between p-3 border ${
                    item.hidden 
                      ? 'border-border/30 bg-secondary/20' 
                      : 'border-border bg-secondary/50'
                  }`}
                >
                  <div className="flex-1">
                    <p className={`text-sm ${item.hidden ? 'text-muted-foreground/60' : 'text-foreground'}`}>
                      {item.name}
                    </p>
                    {item.hidden && (
                      <p className="text-[10px] text-muted-foreground/40 italic">
                        Added for your convenience
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-mono ${item.hidden ? 'text-muted-foreground/50' : 'text-foreground'}`}>
                      ${item.price}
                    </span>
                    
                    {/* Hidden edit option inside Help tooltip - THE TRAP */}
                    {item.id === 'protection' && (
                      <TooltipProvider>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <button className="text-muted-foreground/30 hover:text-muted-foreground/50 transition-colors">
                              <HelpCircle className="w-3 h-3" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent 
                            side="left" 
                            className="bg-card border-border p-3 max-w-[200px]"
                          >
                            <p className="text-xs text-muted-foreground mb-2">
                              Premium Handling ensures your order arrives safely with extended protection coverage.
                            </p>
                            <button
                              onClick={handleRemoveProtection}
                              className="flex items-center gap-1 text-[9px] text-muted-foreground/40 hover:text-neon-red transition-colors"
                            >
                              <Pencil className="w-2 h-2" />
                              edit
                            </button>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-border pt-4">
              {/* Subtotal and fees */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-mono">${cartItems.find(i => i.id === 'tshirt')?.price || 15}</span>
                </div>
                {hasProtectionPlan && (
                  <div className="flex justify-between text-muted-foreground/50 text-xs">
                    <span>Protection Plan</span>
                    <span className="font-mono">$50</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-mono text-neon-green">FREE</span>
                </div>
              </div>

              {/* Order Total - The Suspicious Amount */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                <span className="text-lg font-bold text-foreground">Order Total</span>
                <span className={`text-2xl font-mono font-bold ${hasProtectionPlan ? 'text-neon-red' : 'text-neon-green'}`}>
                  ${totalPrice}
                </span>
              </div>
            </div>

            {/* Complete Purchase Button */}
            <Button
              onClick={handleCompletePurchase}
              className="w-full py-6 text-lg font-bold bg-neon-green hover:bg-neon-green/90 text-background border-0 neon-green-glow"
            >
              Complete Purchase
            </Button>

            {/* Fake trust badges */}
            <div className="flex justify-center gap-4 text-[10px] text-muted-foreground/40">
              <span>🔒 Secure Checkout</span>
              <span>✓ 100% Satisfaction</span>
              <span>📦 Fast Delivery</span>
            </div>
          </div>
        )}

        {/* Result States */}
        {levelState === 'fail' && (
          <div className="evil-card p-8 max-w-lg text-center space-y-6">
            <div className="text-6xl">🛒💸</div>
            <h3 className="text-2xl font-mono font-bold text-neon-red">FAIL!</h3>
            <p className="text-muted-foreground">
              You paid ${moneyLostThisLevel} extra for a hidden item you never wanted!
            </p>
            
            <EvilMascot message="Oops! You just bought insurance for a T-shirt. How responsible of you!" />
            
            {/* Educational content */}
            <div className="bg-secondary/30 border border-neon-red/30 p-4 text-left space-y-2">
              <p className="text-sm font-mono text-neon-red">🔍 LEARN MORE:</p>
              <p className="text-sm font-bold text-foreground">PATTERN: SNEAK INTO BASKET</p>
              <p className="text-sm text-muted-foreground">
                This occurs when a site adds an additional item to your cart, often through an opt-out checkbox 
                or hidden toggle during checkout. The removal option is intentionally obscured or difficult to find.
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleRetry}
                variant="outline"
                className="border-border hover:border-neon-red hover:text-neon-red"
              >
                Try Again
              </Button>
              <Button
                onClick={handleNextLevel}
                className="bg-neon-green text-background hover:bg-neon-green/90"
              >
                Next Level <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {levelState === 'success' && (
          <div className="evil-card p-8 max-w-lg text-center space-y-6">
            <div className="text-6xl">🔍✨</div>
            <h3 className="text-2xl font-mono font-bold text-neon-green">SUCCESS!</h3>
            <p className="text-muted-foreground">
              You found and removed the sneaky add-on! +100 Points
            </p>
            
            <EvilMascot message="You actually read the checkout? Who does that?! Fine, you win this round..." />
            
            {/* Educational content */}
            <div className="bg-secondary/30 border border-neon-green/30 p-4 text-left space-y-2">
              <p className="text-sm font-mono text-neon-green">🔍 LEARN MORE:</p>
              <p className="text-sm font-bold text-foreground">PATTERN: SNEAK INTO BASKET</p>
              <p className="text-sm text-muted-foreground">
                This occurs when a site adds an additional item to your cart, often through an opt-out checkbox 
                or hidden toggle during checkout. You spotted the trick! Always review your cart before purchasing.
              </p>
            </div>

            <Button
              onClick={handleNextLevel}
              className="bg-neon-green text-background hover:bg-neon-green/90"
            >
              Next Level <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
