'use client';

import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';

const PasswordInputField = ({
  disabled,
  placeholder,
}: {
  disabled: boolean;
  placeholder?: string;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { control } = useFormContext();

  const togglePasswordVisibility = () => {
    if (!inputRef.current) return;

    const cursorPosition = inputRef.current.selectionStart;

    setShowPassword((prev) => !prev);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 0);
  };

  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder || 'Input password'}
                className="pr-10"
                {...field}
                ref={(e) => {
                  field.ref(e);
                  inputRef.current = e;
                }}
                disabled={disabled}
              />
              <Button
                variant="ghost"
                type="button"
                size="icon"
                className="absolute bottom-1 right-1 h-7 w-7"
                onClick={togglePasswordVisibility}
                disabled={disabled}
              >
                {showPassword ? <EyeOff /> : <Eye />}
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordInputField;
