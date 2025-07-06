'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface TabItem {
  label: string;
  value: string;
  content: React.ReactNode;
}

interface CustomTabsProps {
  defaultValue: string;
  tabs: TabItem[];
  className?: string;
}

export const CustomTabs = ({
  defaultValue,
  tabs,
  className,
}: CustomTabsProps) => {
  return (
    <Tabs defaultValue={defaultValue} className={cn('w-full', className)}>
      <TabsList className="w-full">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
