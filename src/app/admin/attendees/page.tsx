'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Archive, ArchiveRestore, Search, Download, RefreshCw, Crown, Calendar, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getAttendees, toggleArchiveAttendee } from "@/actions/attendees";
import type { Attendee } from "@/actions/attendees";
import Image from 'next/image';

const AttendeeTable = ({ 
  attendees, 
  isArchived, 
  searchTerm 
}: { 
  attendees: Attendee[], 
  isArchived: boolean,
  searchTerm: string 
}) => {
  const filteredAttendees = attendees.filter(attendee =>
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="font-headline text-primary">Nombre del Invitado</TableHead>
            <TableHead className="font-headline text-primary">Fecha de Confirmación</TableHead>
            <TableHead className="text-right font-headline text-primary">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAttendees.map((attendee, index) => (
            <TableRow 
              key={attendee.id} 
              className="hover:bg-muted/20 transition-colors duration-200 animate-in fade-in duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <UserCheck className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-body">{attendee.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="font-body text-sm">{formatDate(attendee.confirmedAt)}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                                 <form action={async (formData) => {
                   await toggleArchiveAttendee(formData);
                   window.location.reload();
                 }}>
                   <input type="hidden" name="attendeeId" value={attendee.id} />
                   <Button 
                     variant="ghost" 
                     size="icon" 
                     type="submit"
                     className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
                   >
                     {isArchived ? (
                       <ArchiveRestore className="h-4 w-4" />
                     ) : (
                       <Archive className="h-4 w-4" />
                     )}
                     <span className="sr-only">{isArchived ? 'Desarchivar' : 'Archivar'}</span>
                   </Button>
                 </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredAttendees.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <div className="flex flex-col items-center gap-4">
            <Users className="h-12 w-12 opacity-50" />
            <p className="font-body text-lg">
              {searchTerm 
                ? `No se encontraron invitados con "${searchTerm}"`
                : (isArchived ? 'No hay invitados archivados.' : 'Aún no hay invitados confirmados.')
              }
            </p>
            {searchTerm && (
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()}
                className="mt-2"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Limpiar búsqueda
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function AttendeesPage() {
  const [allAttendees, setAllAttendees] = useState<Attendee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    const loadAttendees = async () => {
      try {
        const attendees = await getAttendees();
        setAllAttendees(attendees);
      } catch (error) {
        console.error('Error loading attendees:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAttendees();
  }, []);

  const activeAttendees = allAttendees.filter(a => !a.archived);
  const archivedAttendees = allAttendees.filter(a => a.archived);

  const exportToCSV = () => {
    const csvContent = [
      ['Nombre', 'Fecha de Confirmación', 'Estado'],
      ...activeAttendees.map(attendee => [
        attendee.name,
        new Date(attendee.confirmedAt).toLocaleDateString('es-ES'),
        'Confirmado'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `invitados_confirmados_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="text-foreground/70 font-body">Cargando invitados...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4 pt-0 sm:p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/paper-texture1.jpg')] bg-cover bg-center opacity-5"></div>
      
      {/* Floating crown */}
      <div className="absolute top-10 right-10 opacity-10 animate-bounce-slow">
        <Crown className="h-20 w-20 text-primary" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in duration-1000">
          <div className="flex justify-center mb-4">
          </div>
          <h1 className="text-3xl font-great-vibes text-primary mb-2">Panel de Administración</h1>
          <p className="text-foreground/70 font-body">XV Años - Victoria Pérez</p>
        </div>

        <Card className="w-full shadow-2xl border-2 border-primary/20 bg-background/95 backdrop-blur-md animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
          <CardHeader className="pb-6">
            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
              <CardTitle className="flex items-center gap-3 text-2xl sm:text-3xl text-primary">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="h-8 w-8" />
                </div>
                <span className="font-headline">Gestión de Invitados</span>
              </CardTitle>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium text-muted-foreground font-body">Total Confirmados:</span>
                  <Badge className="text-xl px-4 py-2 bg-primary text-primary-foreground font-headline">
                    {activeAttendees.length}
                  </Badge>
                </div>
                
                <Button 
                  onClick={exportToCSV}
                  variant="outline"
                  className="bg-secondary/10 border-secondary/30 hover:bg-secondary/20 text-secondary-foreground"
                  disabled={activeAttendees.length === 0}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar invitados..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/80 border-primary/30 focus:border-primary transition-colors duration-300"
              />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                <TabsTrigger value="active" className="font-headline">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Confirmados ({activeAttendees.length})
                </TabsTrigger>
                <TabsTrigger value="archived" className="font-headline">
                  <Archive className="h-4 w-4 mr-2" />
                  Archivados ({archivedAttendees.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="mt-6">
                <AttendeeTable attendees={activeAttendees} isArchived={false} searchTerm={searchTerm} />
              </TabsContent>
              
              <TabsContent value="archived" className="mt-6">
                <AttendeeTable attendees={archivedAttendees} isArchived={true} searchTerm={searchTerm} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-foreground/50 text-sm animate-in fade-in duration-1000 delay-500">
          <p>Panel exclusivo para administradores</p>
          <p className="mt-1">© 2025 XV Años Victoria Pérez</p>
        </div>
      </div>
    </main>
  );
}
