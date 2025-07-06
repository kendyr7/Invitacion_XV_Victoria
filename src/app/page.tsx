
'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import MusicPlayer from '@/components/event/MusicPlayer';
import CountdownTimer from '@/components/event/CountdownTimer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SectionCard from '@/components/event/SectionCard';
import ActivityTimelineItem from '@/components/event/ActivityTimelineItem';
import EventDateDisplay from '@/components/event/EventDateDisplay';
import AnimatedName from '@/components/event/AnimatedName';
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
  Loader2,
  Navigation,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { addAttendee } from '@/actions/attendees';

// Hook personalizado para animaciones de scroll
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  
  useEffect(() => {
    // Inicializar todos los elementos como visibles
    const elements = document.querySelectorAll('[data-animate]');
    const initialVisible = new Set();
    elements.forEach(el => {
      if (el.id) {
        initialVisible.add(el.id);
      }
    });
    setVisibleElements(initialVisible);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return visibleElements;
};

export default function HomePage() {
  const [isOpened, setIsOpened] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { toast } = useToast();
  const audioSrc = "/audio/paradise-coldplay.mp3"; 
  const eventTargetDate = "2025-07-27T19:00:00-06:00";
  const visibleElements = useScrollAnimation();

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
    { time: "7:00 PM", title: "Bienvenida", icon: <Martini size={iconSizeTimeline} className="text-accent"/> },
    { time: "7:30 PM", title: "Baile con papa", icon: <Gem size={iconSizeTimeline} className="text-accent"/> }, 
    { time: "7:35 PM", title: "Brindis", icon: <Wine size={iconSizeTimeline} className="text-accent"/> },
    { time: "8:30 PM", title: "Cena", icon: <Utensils size={iconSizeTimeline} className="text-accent"/> },
    { time: "9:30 PM", title: "Inicia Fiesta", icon: <Disc3 size={iconSizeTimeline} className="text-accent"/> }, 
    { time: "11:00 PM", title: "Hora Loca", icon: <PartyPopper size={iconSizeTimeline} className="text-accent"/> },
    { time: "12:00 PM", title: "Pastel", icon: <CakeSlice size={iconSizeTimeline} className="text-accent"/> },
    { time: "1:00 AM", title: "Despedida", icon: <Car size={iconSizeTimeline} className="text-accent"/> },
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
        className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full bg-background/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-xl shadow-2xl my-8 animate-in fade-in slide-in-from-bottom-10 duration-700 bg-[url('/paper-texture1.jpg')] bg-cover bg-center overflow-hidden border-2 border-decorative/20 hover:border-decorative/40 transition-colors duration-300"
      >
        <Image
          src="/flowers_deco/flowers.png"
          alt="Decoración floral superior izquierda"
          width={1280}
          height={953}
          className="absolute top-0 left-0 opacity-80 z-0 animate-in fade-in duration-1000 delay-100"
          data-ai-hint="floral corner decoration"
        />
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-8 sm:space-y-10 p-4 sm:p-8 mt-[14rem]">
          <AnimatedName 
            firstName="Victoria"
            lastName="Pérez"
            className="mb-4 sm:mb-6"
          />

          <div 
            id="tiara-section"
            data-animate
            className={`flex flex-col items-center mt-8 mb-6 transition-all duration-1000 transform ${
              visibleElements.has('tiara-section') 
                ? 'opacity-100 translate-y-0 rotate-0' 
                : 'opacity-100 translate-y-0 rotate-0'
            }`}
          >
            <Image src="/tiara.png" alt="Tiara" width={100} height={100} data-ai-hint="tiara crown" className="drop-shadow-lg animate-bounce-slow"/>
            <p className="font-headline text-1xl sm:text-2xl text-primary mt-2 tracking-widest animate-fade-in-up text-visible">MIS XV AÑOS</p>
          </div>
          
          <Card 
            id="intro-text"
            data-animate
            className={`bg-transparent border-none shadow-none w-full transition-all duration-1000 transform ${
              visibleElements.has('intro-text') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-100 translate-y-0'
            }`}
          >
            <CardContent className="font-body text-lg sm:text-xl text-foreground/80 space-y-1 pt-6">
              <br/>
              <p className="animate-fade-in-left text-visible">Hay momentos que marcan el alma </p>
              <p className="animate-fade-in-right text-visible">para siempre… y este es uno de ellos.</p>
              <br/>
              <p className="animate-fade-in-left text-visible">Te invito a ser parte de</p>
              <p className="animate-fade-in-right text-visible">este capítulo inolvidable en mi vida</p>
            </CardContent>
          </Card>
          
          <EventDateDisplay 
            data-id="date-display"
            data-animate
            monthName="Julio"
            dayName="Domingo"
            dayNumber="27"
            year="2025"
            className={`text-primary mb-12 transition-all duration-1000 transform ${
              visibleElements.has('date-display') 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-100 translate-y-0 scale-100'
            }`}
          />
          
          <Card 
            id="countdown-section"
            data-animate
            className={`w-full max-w-md mt-12 mb-4 bg-transparent border-none transition-all duration-1000 transform ${
              visibleElements.has('countdown-section') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-100 translate-y-0'
            }`}
          >
            <CardContent className="flex flex-col items-center mt-12">
              <p className="mb-12 font-headline text-lg sm:text-xl text-foreground mt-2 tracking-widest animate-fade-in-up text-visible">Tan solo faltan</p>
              <CountdownTimer targetDate={eventTargetDate} />
              <p className="font-headline text-lg sm:text-xl text-foreground mt-12 tracking-widest animate-fade-in-up text-visible">para este dia tan especial</p>
            </CardContent>
          </Card>

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
              <CardTitle className="font-headline text-2xl sm:text-3xl text-foreground flex items-center justify-center text-center">
                ¿Cuándo y dónde?
              </CardTitle>
            </CardHeader>
            <CardContent className="font-body text-lg sm:text-xl text-foreground/80 space-y-1 pt-6">
            <p>A continuacion encontraras el horario y ubicacion de los eventos de mi fiesta, asi como un boton directo a Google Maps para que puedas llegar facilmente.</p>
            </CardContent>
          </Card>
          
          {/* <div className="w-full animate-in fade-in duration-1000 delay-1000">
            <SectionCard
              title="Ceremonia Religiosa"
              locationButtons={[
                { 
                  text: "Waze", 
                  url: "https://waze.com/ul/hd1g8q8q8q", 
                  icon: <Navigation className="mr-2 h-4 w-4" />
                },
                { 
                  text: "Google Maps", 
                  url: "https://maps.app.goo.gl/urnxoQk9w1md1kYGA", 
                  icon: <MapPin className="mr-2 h-4 w-4" />
                }
              ]}
              titleClassName="text-foreground"
            >
              <div className="flex flex-col items-center space-y-2 mb-3">
                <Image src="/church.png" alt="Iglesia Icon" width={40} height={40} className="shrink-0 animate-bounce-slow" data-ai-hint="church building"/>
              </div>
              <div className="mt-1 space-y-1 text-center">
                <p className="flex items-center justify-center animate-fade-in-up">Parroquia Jesús de la Divina Misericordia</p>
                <p className="flex items-center justify-center animate-fade-in-up"><i>Managua, 5:00 PM</i></p>
              </div>
            </SectionCard>
          </div> */}
          
          <div className="w-full animate-in fade-in duration-1000 delay-1100">
            <SectionCard 
              title="Recepción"
              locationButtons={[
                { 
                  text: "Waze", 
                  url: "https://www.waze.com/en/live-map/directions/holiday-inn-managua-convention-center-pista-heroes-de-la-insurreccion?place=w.179372153.1793852604.540644", 
                  icon: <Navigation className="mr-2 h-4 w-4" />
                },
                { 
                  text: "Google Maps", 
                  url: "https://maps.app.goo.gl/NirirnL3kUby84ty7", 
                  icon: <MapPin className="mr-2 h-4 w-4" />
                }
              ]}
              titleClassName="text-foreground"
            >
              <div className="flex flex-col items-center space-y-2 mb-3">
                <Image src="/champagne.png" alt="champagne Icon" width={40} height={40} className="shrink-0 animate-bounce-slow" data-ai-hint="champagne"/>
              </div>
              <div className="mt-1 space-y-1 text-center">
                <p className="flex items-center justify-center animate-fade-in-up">Hotel Holiday Inn, Salón Telica</p>
                <p className="flex items-center justify-center animate-fade-in-up"><i>Managua, 7:00 PM</i></p>
              </div>
              <div className="mt-4 flex justify-center">
                <Image 
                  src="/Holiday_inn.jpg" 
                  alt="Hotel Holiday Inn Managua" 
                  width={300} 
                  height={200} 
                  className="rounded-lg shadow-lg object-cover animate-fade-in-up" 
                  data-ai-hint="hotel holiday inn"
                />
              </div>
            </SectionCard>
          </div>

          {/*<div className="w-full animate-in fade-in duration-1000 delay-1200">
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
          </div>*/}
          <br />
          <br />
          <br />
          <div className="w-full animate-in fade-in duration-1000 delay-[1300ms]">
            <SectionCard 
              title="Código de Vestimenta"
              titleClassName="text-foreground"
            >
              <div><p className="text-base sm:text-lg text-foreground/90">Formal</p></div>

              <Image src="/dress-code-fix.png" alt="Código de Vestimenta Formal" width={300} height={300} className="mx-auto mt-3 mb-3" data-ai-hint="formal attire" />
            </SectionCard>
          </div>
          <br />
          <br />
          <br />

          <div className="w-full animate-in fade-in duration-1000 delay-[1400ms]">
            <SectionCard
              title="Colores Reservados"
              icon={<Brush size={28} className="text-foreground"/>}
              titleClassName="text-foreground"
            >
              <div className="flex justify-center space-x-3 mt-2">
                <Image src="/colors/color1.jpeg" alt="Color Reservado 1" width={50} height={50} className="rounded-md shadow-md" data-ai-hint="color swatch" />
                <Image src="/colors/color2.jpeg" alt="Color Reservado 2" width={50} height={50} className="rounded-md shadow-md" data-ai-hint="color swatch" />
                <Image src="/colors/color3.jpeg" alt="Color Reservado 3" width={50} height={50} className="rounded-md shadow-md" data-ai-hint="color swatch" />
              </div> <br />
              <p className="text-foreground/70 mt-3 px-4">
                Con mucho aprecio, les solicitamos que reserven estos colores exclusivamente para la quinceañera y su corte, para que puedan destacar y lucir radiantes en este día tan especial.
              </p>
            </SectionCard>
          </div>
          <br />
          <br />
          <br />

          <div className="w-full animate-in fade-in duration-1000 delay-[1500ms]">
            <SectionCard 
              title="Regalos" 
              icon={<Gem size={28} className="text-foreground"/>}
              titleClassName="text-foreground"
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
            <div 
              id="confirmation-section"
              data-animate
              className={`flex flex-col items-center w-full max-w-xs transition-all duration-1000 transform ${
                visibleElements.has('confirmation-section') 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
            >
              <Input
                type="text"
                placeholder="Nombre y Apellido"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="mt-4 mb-3 bg-white/80 border-primary text-center w-full max-w-[280px] placeholder:text-foreground/50 animate-fade-in-up hover:border-decorative focus:border-decorative transition-colors duration-300"
                aria-label="Tu nombre y apellido"
              />
              <Button
                onClick={handleConfirm}
                disabled={isConfirming}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-headline text-xl py-3 px-6 sm:py-4 sm:px-8 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 w-full mb-2 animate-fade-in-up"
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
            </div>
            
            <div 
              id="final-message"
              data-animate
              className={`mt-4 transition-all duration-1000 transform ${
                visibleElements.has('final-message') 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <p className="font-body text-lg sm:text-xl text-foreground/80 text-center px-4 animate-fade-in-up">¡Te esperamos! </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full text-center py-4 bg-background/80 dark:bg-neutral-900/80 text-foreground/60 text-xs bg-[url('/flowers_deco/paper-texture1.jpg')] bg-cover bg-center backdrop-blur-md">
          <p className="italic animate-fade-in-up">Creado por Kendyr Quintanilla </p>
        </footer>

      </div>
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-decorative/80 backdrop-blur-sm p-0 text-primary-foreground shadow-lg transition-transform hover:scale-110 hover:bg-primary"
          aria-label="Volver al inicio"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </main>
  );
}
