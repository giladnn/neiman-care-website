
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { AccessibilityIcon, Type, Contrast, Sun, ZoomIn } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translate } from '@/translations';

const AccessibilityWidget = () => {
  const { language } = useLanguage();
  const [fontSize, setFontSize] = useState(100);
  const [contrast, setContrast] = useState(false);
  const [brightness, setBrightness] = useState(100);
  
  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0];
    setFontSize(newSize);
    document.documentElement.style.fontSize = `${newSize}%`;
  };
  
  const handleBrightnessChange = (value: number[]) => {
    const newBrightness = value[0];
    setBrightness(newBrightness);
    document.documentElement.style.filter = `brightness(${newBrightness}%)`;
  };
  
  const toggleHighContrast = () => {
    const newContrast = !contrast;
    setContrast(newContrast);
    
    if (newContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  };
  
  const resetAll = () => {
    setFontSize(100);
    setContrast(false);
    setBrightness(100);
    document.documentElement.style.fontSize = '100%';
    document.documentElement.style.filter = 'brightness(100%)';
    document.body.classList.remove('high-contrast');
  };
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="fixed bottom-6 right-6 z-50 bg-primary text-white rounded-full p-3 shadow-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Accessibility options"
        >
          <AccessibilityIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Accessibility Options</SheetTitle>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <span>Font Size</span>
              </div>
              <span>{fontSize}%</span>
            </div>
            <Slider
              value={[fontSize]}
              min={80}
              max={150}
              step={10}
              onValueChange={handleFontSizeChange}
              aria-label="Adjust font size"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <span>Brightness</span>
              </div>
              <span>{brightness}%</span>
            </div>
            <Slider
              value={[brightness]}
              min={70}
              max={130}
              step={5}
              onValueChange={handleBrightnessChange}
              aria-label="Adjust screen brightness"
            />
          </div>
          
          <div>
            <Button
              variant={contrast ? "default" : "outline"}
              className="w-full flex items-center justify-between"
              onClick={toggleHighContrast}
              aria-pressed={contrast}
            >
              <div className="flex items-center gap-2">
                <Contrast className="h-4 w-4" />
                <span>High Contrast</span>
              </div>
              <span>{contrast ? "On" : "Off"}</span>
            </Button>
          </div>
          
          <Button 
            variant="secondary" 
            className="w-full"
            onClick={resetAll}
          >
            Reset All
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AccessibilityWidget;
