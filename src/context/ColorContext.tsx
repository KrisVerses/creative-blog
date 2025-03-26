import { createContext, useContext, ReactNode, useState } from 'react';

type CategorySlug = 'coding' | 'design' | 'health' | 'life' | 'productivity' | 'self-help' | 'travel' | 'writing';

type CategoryStyle = {
    bg: string;
    accent: string;
    text: string;
    hover: string;
    pattern: string;
    cardBg: string;
};

type ColorContextType = {
    currentCategory: CategorySlug | null;
    categoryStyles: Record<CategorySlug, CategoryStyle>;
    setCurrentCategory: (category: CategorySlug | null) => void;
};

export const categoryStyles: Record<CategorySlug, CategoryStyle> = {
    coding: {
        bg: 'bg-[#1a1a1a]',
        accent: 'bg-blue-500',
        text: 'text-[#1E293B]',
        hover: 'hover:bg-blue-100',
        pattern: 'bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,rgba(0,0,0,0)_100%)]',
        cardBg: 'bg-blue-950/30'
    },
    design: {
        bg: 'bg-[#1a1a1a]',
        accent: 'bg-purple-500',
        text: 'text-purple-100',
        hover: 'hover:bg-purple-900/50',
        pattern: 'bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1)_0%,rgba(0,0,0,0)_100%)]',
        cardBg: 'bg-purple-950/30'
    },
    health: {
        bg: 'bg-[#1a1a1a]',
        accent: 'bg-green-500',
        text: 'text-green-100',
        hover: 'hover:bg-green-900/50',
        pattern: 'bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.1)_0%,rgba(0,0,0,0)_100%)]',
        cardBg: 'bg-green-950/30'
    },
    life: {
        bg: 'bg-[#1a1a1a]',
        accent: 'bg-yellow-500',
        text: 'text-yellow-100',
        hover: 'hover:bg-yellow-900/50',
        pattern: 'bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.1)_0%,rgba(0,0,0,0)_100%)]',
        cardBg: 'bg-yellow-950/30'
    },
    productivity: {
        bg: 'bg-[#1a1a1a]',
        accent: 'bg-orange-500',
        text: 'text-orange-100',
        hover: 'hover:bg-orange-900/50',
        pattern: 'bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.1)_0%,rgba(0,0,0,0)_100%)]',
        cardBg: 'bg-orange-950/30'
    },
    'self-help': {
        bg: 'bg-[#1a1a1a]',
        accent: 'bg-pink-500',
        text: 'text-pink-100',
        hover: 'hover:bg-pink-900/50',
        pattern: 'bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.1)_0%,rgba(0,0,0,0)_100%)]',
        cardBg: 'bg-pink-950/30'
    },
    travel: {
        bg: 'bg-[#1a1a1a]',
        accent: 'bg-indigo-500',
        text: 'text-indigo-100',
        hover: 'hover:bg-indigo-900/50',
        pattern: 'bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,rgba(0,0,0,0)_100%)]',
        cardBg: 'bg-indigo-950/30'
    },
    writing: {
        bg: 'bg-[#1a1a1a]',
        accent: 'bg-teal-500',
        text: 'text-teal-100',
        hover: 'hover:bg-teal-900/50',
        pattern: 'bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.1)_0%,rgba(0,0,0,0)_100%)]',
        cardBg: 'bg-teal-950/30'
    }
};

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children }: { children: ReactNode }) {
    const [currentCategory, setCurrentCategory] = useState<CategorySlug | null>(null);

    return (
        <ColorContext.Provider value={{ currentCategory, categoryStyles, setCurrentCategory }}>
            {children}
        </ColorContext.Provider>
    );
}

export function useColors() {
    const context = useContext(ColorContext);
    if (context === undefined) {
        throw new Error('useColors must be used within a ColorProvider');
    }
    return context;
} 