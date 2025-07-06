'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Lock, User, Eye, EyeOff, Crown } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      const success = login(user, password);
      if (success) {
        toast({
          title: "¡Bienvenido!",
          description: "Inicio de sesión exitoso. Redirigiendo...",
        });
        router.push('/admin/attendees');
      } else {
        toast({
          title: "Error de inicio de sesión",
          description: "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/paper-texture1.jpg')] bg-cover bg-center opacity-5"></div>
      
      {/* Floating elements */}

      <div className="absolute bottom-10 right-10 opacity-20 animate-bounce-slow" style={{ animationDelay: '1s' }}>
        <Crown className="h-12 w-12 text-secondary" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in duration-1000">
          <div className="flex justify-center mb-4">
            <div className="relative">

            </div>
          </div>
          <h1 className="text-3xl font-great-vibes text-primary mb-2">Panel de Administración</h1>
          <p className="text-foreground/70 font-body">XV Años - Victoria Pérez</p>
        </div>

        {/* Login Card */}
        <Card className="w-full shadow-2xl border-2 border-primary/20 bg-background/95 backdrop-blur-md animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Lock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-headline text-foreground">Acceso Administrativo</CardTitle>
            <CardDescription className="text-foreground/70">
              Ingresa tus credenciales para gestionar los invitados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="user" className="text-foreground font-medium flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Usuario / Email
                </Label>
                <div className="relative">
                  <Input
                    id="user"
                    type="text"
                    placeholder="Ingresa tu usuario o email"
                    required
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="pl-10 bg-background/80 border-primary/30 focus:border-primary transition-colors duration-300"
                    disabled={isLoading}
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  Contraseña
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa tu contraseña"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-background/80 border-primary/30 focus:border-primary transition-colors duration-300"
                    disabled={isLoading}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground/50" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-foreground/50 hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-headline text-lg py-3 transition-all duration-300 transform hover:scale-105 shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  'Iniciar Sesión'
                )}
              </Button>
            </form>
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
