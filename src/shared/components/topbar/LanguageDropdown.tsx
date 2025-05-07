import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import i18n from '@/i18n';

const LanguageDropdown: React.FC = () => {
    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang); // Update bahasa menggunakan i18n
        localStorage.setItem('language', lang); // Simpan pilihan bahasa ke localStorage
    };

    return (
        <div className="relative">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <span>{i18n.language === 'en' ? 'English' : 'Bahasa Indonesia'}</span>
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                        English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLanguageChange('id')}>
                        Bahasa Indonesia
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default LanguageDropdown;