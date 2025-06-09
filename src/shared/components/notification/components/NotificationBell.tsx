import { Bell, MessageSquareText } from 'lucide-react';
import { Link } from 'react-router';
import { useNotifications } from '@/shared/components/notification/context/NotificationContext';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function NotificationBell() {
    const { notifications, unreadCount, clearUnread } = useNotifications();
    const recentNotifications = notifications.slice(0, 5); // Tampilkan 5 notifikasi terakhir di dropdown

    return (
        <DropdownMenu onOpenChange={(isOpen) => {
            // Saat dropdown dibuka, reset unread count
            if (isOpen) {
                clearUnread();
            }
        }}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full flex items-center justify-center p-0"
                        >
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </Badge>
                    )}
                    <span className="sr-only">Buka notifikasi</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 md:w-96" align="end">
                <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ScrollArea className="h-80">
                    {recentNotifications.length > 0 ? (
                        recentNotifications.map((notif) => (
                            <DropdownMenuItem key={notif.id} className="flex items-start gap-3 p-2">
                                <Avatar className="h-8 w-8 mt-1">
                                    <AvatarFallback>
                                        <MessageSquareText size={18} />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold text-sm">{`Event: ${notif.type}`}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {`Di room ${notif.room_id}: ${JSON.stringify(notif.payload)}`.substring(0, 50)}...
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {new Date(notif.timestamp).toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </DropdownMenuItem>
                        ))
                    ) : (
                        <p className="text-center text-sm text-muted-foreground p-4">
                            Tidak ada notifikasi baru.
                        </p>
                    )}
                </ScrollArea>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link to="/notifications" className="w-full justify-center cursor-pointer">
                        Lihat Semua Notifikasi
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}