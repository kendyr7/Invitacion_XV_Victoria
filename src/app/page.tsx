
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import MusicPlayer from '@/components/event/MusicPlayer';
import CountdownTimer from '@/components/event/CountdownTimer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SectionCard from '@/components/event/SectionCard';
import ActivityTimelineItem from '@/components/event/ActivityTimelineItem';
import EventDateDisplay from '@/components/event/EventDateDisplay';
import { Input } from '@/components/ui/input';
import { 
  Gift, 
  ListChecks,
  Utensils,
  Sparkles as SparklesIcon, 
  CakeSlice,
  PartyPopper,
  GlassWater,
  Martini, 
  Gem, 
  Camera,
  Disc3, 
  Car,
  Palette,
  Brush,
  Wine,
  Bus,
  Mail,
  ArrowUp,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { addAttendee } from '@/actions/attendees';

export default function HomePage() {
  const [isOpened, setIsOpened] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { toast } = useToast();
  const audioSrc = "/audio/paradise-coldplay.mp3"; 
  const eventTargetDate = "2025-07-27T19:00:00-06:00";

  useEffect(() => {
    if (!isOpened) return;

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpened]);
  
  const handleOpenEnvelope = () => {
    setIsOpened(true);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleConfirm = async () => {
    if (!guestName.trim()) {
      toast({
        title: "Campo requerido",
        description: "Por favor, ingresa tu nombre y apellido para confirmar.",
        variant: "destructive",
      });
      return;
    }

    setIsConfirming(true);
    try {
      const result = await addAttendee(guestName.trim());
      
      if (result.success) {
        toast({
          title: "¡Confirmación enviada!",
          description: "Tu asistencia ha sido registrada correctamente. ¡Muchas gracias!",
        });
        setGuestName('');
      } else {
        toast({
          title: "Error al confirmar",
          description: result.message || "No se pudo registrar tu asistencia. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Confirmation error:", error);
      toast({
        title: "Error inesperado",
        description: "Ocurrió un error. Por favor, revisa la consola o contacta al administrador.",
        variant: "destructive",
      });
    } finally {
      setIsConfirming(false);
    }
  };

  const iconSizeTimeline = 28; 

  const timelineEventsNew = [
    { time: "7:00 PM", title: "Bienvenida", icon: <Martini size={iconSizeTimeline} className="text-primary"/> },
    { time: "7:30 PM", title: "Baile con papa", icon: <Gem size={iconSizeTimeline} className="text-primary"/> }, 
    { time: "7:35 PM", title: "Brindis", icon: <Wine size={iconSizeTimeline} className="text-primary"/> },
    { time: "8:30 PM", title: "Cena", icon: <Utensils size={iconSizeTimeline} className="text-primary"/> },
    { time: "9:30 PM", title: "Inicia Fiesta", icon: <Disc3 size={iconSizeTimeline} className="text-primary"/> }, 
    { time: "11:00 PM", title: "Hora Loca", icon: <PartyPopper size={iconSizeTimeline} className="text-primary"/> },
    { time: "12:00 PM", title: "Pastel", icon: <CakeSlice size={iconSizeTimeline} className="text-primary"/> },
    { time: "1:00 AM", title: "Despedida", icon: <Car size={iconSizeTimeline} className="text-primary"/> },
  ];
  
  if (!isOpened) {
    return (
      <main 
        className="flex min-h-screen flex-col items-center justify-center bg-background p-4 cursor-pointer" 
        onClick={handleOpenEnvelope}
      >
        <div className="text-center animate-in fade-in duration-1000">
          <Image 
            src="/envelope.png"
            alt="An envelope, click to open invitation"
            width={400}
            height={300}
            className="mx-auto"
            data-ai-hint="envelope mail"
            priority
          />
          <p className="mt-4 text-lg text-foreground/80 font-headline">Haz clic para abrir la invitación</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground relative overflow-auto sm:overflow-hidden">
      <Image 
        src="/flowers_deco/elegant-floral-background.jpeg"
        fill
        alt="Elegant event background" 
        className="absolute inset-0 z-[-1] opacity-20 filter blur-sm object-cover"
        priority
        data-ai-hint="elegant floral"
      />
      
      <div 
        className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full bg-background/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-xl shadow-2xl my-8 animate-in fade-in slide-in-from-bottom-10 duration-700 bg-[url('/paper-texture.jpg')] bg-cover bg-center overflow-hidden"
      >
        <Image
          src="/flowers_deco/flowers.png"
          alt="Decoración floral superior izquierda"
          width={1280}
          height={953}
          className="absolute top-0 left-0 opacity-80 z-0 animate-in fade-in duration-1000 delay-100"
          data-ai-hint="floral corner decoration"
        />
        <div className="mt-12 relative z-10 flex flex-col items-center text-center space-y-8 sm:space-y-10 p-4 sm:p-8">
        
          <div className="flex flex-col items-center mt-8 mb-6 animate-in fade-in duration-1000 delay-300">
            <Image src="/tiara.png" alt="Tiara" width={100} height={100} data-ai-hint="tiara crown" className="drop-shadow-lg"/>
            <p className="font-headline text-3xl sm:text-4xl text-primary mt-2 tracking-widest">Mis XV Años</p>
          </div>

          <div className="animate-in fade-in duration-1000 delay-400 mb-4 sm:mb-6">
            <p className="font-great-vibes text-7xl sm:text-9xl text-primary">Victoria Pérez</p>
          </div>

          <MusicPlayer audioSrc={audioSrc} autoPlay={isOpened} className="animate-in fade-in duration-1000 delay-500" />
          
          <Card className="bg-transparent border-none shadow-none w-full animate-in fade-in duration-1000 delay-200">
            <CardContent className="font-body text-lg sm:text-xl text-foreground/80 space-y-1 pt-6">
              <br/>
              <p>Hay momentos que marcan el alma </p>
              <p>para siempre… y este es uno de ellos.</p>
              <br/>
              <p>Te invito a ser parte de</p>
              <p>este capítulo inolvidable en mi vida</p>
            </CardContent>
          </Card>

          <EventDateDisplay 
            monthName="Julio"
            dayName="Domingo"
            dayNumber="27"
            year="2025"
            className="animate-in fade-in duration-1000 delay-700 text-primary"
          />

          <div className="w-full max-w-md animate-in fade-in duration-1000 delay-800 mt-4 mb-4">
            <div className="flex flex-col items-center">
              <p className="font-headline text-lg sm:text-xl text-primary mt-2 tracking-widest">Tan solo faltan</p>
              <CountdownTimer targetDate={eventTargetDate} />
              <p className="font-headline text-lg sm:text-xl text-primary mt-2 tracking-widest">para este dia tan especial</p>
            </div>
          </div>

          <div className="animate-in fade-in duration-1000 delay-900">
            <Image
              src="/flowers_deco/pink_flower_d.png"
              alt="Pink Flower Decoration"
              width={400}
              height={242}
              data-ai-hint="pink flower"
            />
          </div>

          <Card className="bg-transparent border-none shadow-none w-full animate-in fade-in duration-1000 delay-600">
            <CardHeader className="pb-3 pt-5">
              <CardTitle className="font-headline text-2xl sm:text-3xl text-primary flex items-center justify-center text-center">
                ¿Cuándo y dónde?
              </CardTitle>
            </CardHeader>
            <CardContent className="font-body text-lg sm:text-xl text-foreground/80 space-y-1 pt-6">
            <p>A continuacion encontraras el horario y ubicacion de los eventos de mi fiesta, asi como un boton directo a Google Maps para que puedas llegar facilmente.</p>
            </CardContent>
          </Card>
          
          <div className="w-full animate-in fade-in duration-1000 delay-1000">
            <SectionCard
              title="Ceremonia Religiosa"
              locationButton={{ text: "Ver Ubicación", url: "https://maps.app.goo.gl/urnxoQk9w1md1kYGA" }}
              titleClassName="text-primary"
            >
              <div className="flex flex-col items-center space-y-2 mb-3">
                <Image src="/church.png" alt="Iglesia Icon" width={40} height={40} className="shrink-0" data-ai-hint="church building"/>
              </div>
              <div className="mt-1 space-y-1 text-center">
                <p className="flex items-center justify-center">Parroquia Jesús de la Divina Misericordia</p>
                <p className="flex items-center justify-center"><i>Managua, 5:00 PM</i></p>
              </div>
            </SectionCard>
          </div>
          
          <div className="w-full animate-in fade-in duration-1000 delay-1100">
            <SectionCard 
              title="Recepción"
              locationButton={{ text: "Ver Ubicación", url: "https://maps.app.goo.gl/2nyhPou1JRjuhLdq9" }}
              titleClassName="text-primary"
            >
              <div className="flex flex-col items-center space-y-2 mb-3">
                <Image src="/champagne.png" alt="champagne Icon" width={40} height={40} className="shrink-0" data-ai-hint="champagne"/>
              </div>
              <div className="mt-1 space-y-1 text-center">
                <p className="flex items-center justify-center">Hotel Holiday Inn</p>
                <p className="flex items-center justify-center"><i>Managua, 7:00 PM</i></p>
              </div>
            </SectionCard>
          </div>

          <div className="w-full animate-in fade-in duration-1000 delay-1200">
            <SectionCard 
              title="Itinerario de Actividades" 
              icon={<ListChecks size={28} className="text-primary"/>}
              contentClassName="px-0 pt-4 pb-4" 
              titleClassName="text-primary"
            >
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                
                {timelineEventsNew.length > 0 && (
                  <div className="absolute top-0 bottom-0 left-1/2 w-[1.5px] bg-primary -translate-x-1/2 z-0"></div>
                )}
                <div className="space-y-0"> 
                  {timelineEventsNew.map((event, index) => (
                    <ActivityTimelineItem 
                      key={index}
                      time={event.time}
                      title={event.title}
                      icon={event.icon}
                      align={index % 2 === 0 ? 'left' : 'right'} 
                    />
                  ))}
                </div>
              </div>
            </SectionCard>
          </div>

          <div className="w-full animate-in fade-in duration-1000 delay-[1300ms]">
            <SectionCard 
              title="Código de Vestimenta"
              titleClassName="text-primary"
            >
              <div><p className="text-base sm:text-lg text-foreground/90">Formal</p></div>

              <Image src="/dress-code-fix.png" alt="Código de Vestimenta Formal" width={300} height={300} className="mx-auto mt-3 mb-3" data-ai-hint="formal attire" />
            </SectionCard>
          </div>

          <div className="w-full animate-in fade-in duration-1000 delay-[1400ms]">
            <SectionCard
              title="Colores Reservados"
              icon={<Palette size={28} className="text-primary"/>}
              titleClassName="text-primary"
            >
              <div className="flex justify-center space-x-3 mt-2">
                <Image src="/colors/color1.jpeg" alt="Color Reservado 1" width={50} height={50} className="rounded-md shadow-md" data-ai-hint="color swatch" />
                <Image src="/colors/color2.jpeg" alt="Color Reservado 2" width={50} height={50} className="rounded-md shadow-md" data-ai-hint="color swatch" />
                <Image src="/colors/color3.jpeg" alt="Color Reservado 3" width={50} height={50} className="rounded-md shadow-md" data-ai-hint="color swatch" />
              </div> <br />
              <p className="text-foreground/70 mt-3 px-4">
                Con cariño, te pedimos considerar estos tonos como reservados para la quinceañera y su corte, permitiéndoles brillar en este día especial.
              </p>
            </SectionCard>
          </div>


          <div className="w-full animate-in fade-in duration-1000 delay-[1500ms]">
            <SectionCard 
              title="Regalos" 
              icon={<Gift size={28} className="text-primary"/>}
              titleClassName="text-primary"
            >
              <p className="flex items-center justify-center gap-2">
                <span>Agradecemos sus muestras de cariño en sobre</span>
              </p>
            </SectionCard>
          </div>
        </div>
        
        <div 
          className="relative w-full bg-[url('/flowers_deco/flowers_deco.png')] bg-contain bg-no-repeat bg-bottom"
        >
          <div className="flex flex-col items-center pt-10 pb-24 px-4">
            <div className="flex flex-col items-center animate-in fade-in duration-1000 delay-[200ms] w-full max-w-xs">
              <Input
                type="text"
                placeholder="Nombre y Apellido"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="mt-4 mb-3 bg-white/80 border-primary text-center w-full max-w-[280px] placeholder:text-foreground/50"
                aria-label="Tu nombre y apellido"
              />
              <Button
                onClick={handleConfirm}
                disabled={isConfirming}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-headline text-xl py-3 px-6 sm:py-4 sm:px-8 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-full mb-2"
                aria-label="Confirmar asistencia"
              >
                {isConfirming ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Confirmando...
                  </>
                ) : (
                  'Confirmar Asistencia'
                )}
              </Button>
              <p className="text-sm text-foreground/80 mt-2 text-center">
                Por favor, confirma antes del 15 de Julio.
              </p>
            </div>
            <div className="animate-in fade-in duration-1000 delay-[400ms] mt-4">
              <p className="font-body text-lg sm:text-xl text-foreground/80 text-center px-4">¡Gracias por acompañarme <br/> en este día tan especial! <br/> ❤️</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full text-center py-4 bg-background/80 dark:bg-neutral-900/80 text-foreground/60 text-xs bg-[url('/paper-texture.jpg')] bg-cover bg-center backdrop-blur-md">
          <p>Creado por Kendyr Quintanilla </p>
        </footer>

      </div>
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-primary/80 backdrop-blur-sm p-0 text-primary-foreground shadow-lg transition-transform hover:scale-110 hover:bg-primary"
          aria-label="Volver al inicio"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </main>
  );
}
