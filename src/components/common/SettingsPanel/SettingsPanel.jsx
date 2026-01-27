import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { STORAGE_KEYS } from '@/constants';
import { storage } from '@/utils/storage';
import { useLanguage } from '@/hooks/useLanguage';

const SettingsPanel = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const storedKey = storage.get(STORAGE_KEYS.OPENAI_API_KEY, '');
    setApiKey(storedKey || '');
    setStatusMessage('');
  }, [isOpen]);

  const handleSave = () => {
    const trimmedKey = apiKey.trim();
    if (trimmedKey) {
      storage.set(STORAGE_KEYS.OPENAI_API_KEY, trimmedKey);
      setStatusMessage(t('settings.saved'));
    } else {
      storage.remove(STORAGE_KEYS.OPENAI_API_KEY);
      setStatusMessage(t('settings.cleared'));
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[320px] sm:w-[380px]">
        <SheetHeader className="space-y-2">
          <SheetTitle>{t('settings.title')}</SheetTitle>
          <SheetDescription>{t('settings.description')}</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="openai-api-key">{t('settings.openaiApiKey.label')}</Label>
            <Input
              id="openai-api-key"
              type={showApiKey ? 'text' : 'password'}
              placeholder={t('settings.openaiApiKey.placeholder')}
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              {t('settings.openaiApiKey.helper')}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" onClick={() => setShowApiKey((prev) => !prev)}>
              {showApiKey ? t('settings.hide') : t('settings.show')}
            </Button>
            <Button onClick={handleSave}>{t('settings.save')}</Button>
          </div>
          {statusMessage && (
            <p className="text-xs text-green-600 dark:text-green-400">{statusMessage}</p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsPanel;
