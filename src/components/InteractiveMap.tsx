import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapPoint {
  id: number;
  name: string;
  year: string;
  coordinates: [number, number];
  technology: string;
  description: string;
}

const InteractiveMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activePoint, setActivePoint] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const mapPoints: MapPoint[] = [
    {
      id: 1,
      name: "Great Zimbabwe",
      year: "1100 CE",
      coordinates: [31.1367, -20.1715],
      technology: "Acoustic Architecture",
      description: "Advanced sound engineering that allowed communication across vast distances without electricity."
    },
    {
      id: 2,
      name: "Timbuktu",
      year: "1400 CE",
      coordinates: [-3.0026, 16.7736],
      technology: "Desert Computing",
      description: "Mathematical systems that used sand patterns to solve complex equations and store information."
    },
    {
      id: 3,
      name: "Axum",
      year: "300 CE",
      coordinates: [38.7216, 14.1241],
      technology: "Gravity Stabilization",
      description: "Architectural techniques that used principles of physics to create self-stabilizing structures."
    },
    {
      id: 4,
      name: "Congo Basin",
      year: "Pre-colonial",
      coordinates: [23.6563, -3.0609],
      technology: "Organic Signal Processing",
      description: "Communication networks using plant-based transmissions across forest ecosystems."
    },
    {
      id: 5,
      name: "Nubia",
      year: "2000 BCE",
      coordinates: [30.4852, 18.4795],
      technology: "Solar Metallurgy",
      description: "Advanced techniques for working with metals using focused solar energy."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || !isVisible) return;
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VuZTI0MyIsImEiOiJjbTVudWdqOWowZWRiMmpyNDE4OHVsNzZpIn0.i4XDlkcURfkPQMMzCe0keg';
    
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      projection: 'globe',
      zoom: 1.8,
      center: [20, 5],
      pitch: 45,
      bearing: 0,
      attributionControl: false
    });

    mapRef.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'bottom-right'
    );

    mapRef.current.on('style.load', () => {
      mapRef.current?.setFog({
        color: 'rgb(23, 43, 59)',
        'high-color': 'rgb(36, 92, 223)',
        'horizon-blend': 0.4,
        'space-color': 'rgb(11, 11, 25)',
        'star-intensity': 0.6
      });
    });

    mapPoints.forEach(point => {
      const markerEl = document.createElement('div');
      markerEl.className = 'mapbox-custom-marker';
      markerEl.style.width = '20px';
      markerEl.style.height = '20px';
      markerEl.style.borderRadius = '50%';
      markerEl.style.background = point.id === activePoint ? '#facc15' : '#22c55e';
      markerEl.style.cursor = 'pointer';
      markerEl.style.boxShadow = point.id === activePoint 
        ? '0 0 15px 5px rgba(251, 191, 36, 0.4)' 
        : '0 0 10px 2px rgba(34, 197, 94, 0.4)';
      markerEl.style.transition = 'all 0.3s ease';
      
      const pulseEl = document.createElement('div');
      pulseEl.className = 'pulse';
      pulseEl.style.position = 'absolute';
      pulseEl.style.top = '0';
      pulseEl.style.left = '0';
      pulseEl.style.right = '0';
      pulseEl.style.bottom = '0';
      pulseEl.style.borderRadius = '50%';
      pulseEl.style.animation = 'pulse 2s infinite';
      pulseEl.style.background = point.id === activePoint ? 'rgba(251, 191, 36, 0.4)' : 'rgba(34, 197, 94, 0.4)';
      markerEl.appendChild(pulseEl);
      
      markerEl.addEventListener('click', () => {
        setActivePoint(point.id);
      });

      new mapboxgl.Marker(markerEl)
        .setLngLat(point.coordinates)
        .addTo(mapRef.current!);
    });

    const secondsPerRevolution = 180;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;
    let userInteracting = false;
    let spinEnabled = true;

    function spinGlobe() {
      if (!mapRef.current) return;
      
      const zoom = mapRef.current.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = mapRef.current.getCenter();
        center.lng -= distancePerSecond / 60;
        mapRef.current.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    mapRef.current.on('mousedown', () => {
      userInteracting = true;
    });
    
    mapRef.current.on('dragstart', () => {
      userInteracting = true;
    });
    
    mapRef.current.on('mouseup', () => {
      userInteracting = false;
      spinGlobe();
    });
    
    mapRef.current.on('touchend', () => {
      userInteracting = false;
      spinGlobe();
    });

    mapRef.current.on('moveend', () => {
      spinGlobe();
    });

    if (!document.getElementById('mapbox-pulse-style')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'mapbox-pulse-style';
      styleEl.innerHTML = `
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `;
      document.head.appendChild(styleEl);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [isVisible, activePoint]);

  return (
    <section id="map" className="section-padding relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/70 to-background/95"></div>
      </div>

      <div className="container mx-auto">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Uncolonized Tech Evolution</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">Alternative Technology Timeline</h3>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Explore how African civilizations might have developed technology without colonial disruption.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="h-[450px] rounded-2xl overflow-hidden shadow-xl border border-primary/20 relative">
              <div ref={mapContainerRef} className="absolute inset-0 rounded-xl" />
            </div>

            <div className="glass-card rounded-xl p-6 md:p-8 h-[450px] flex flex-col backdrop-blur-md bg-white/10">
              {activePoint ? (
                <div className="animate-fade-in-up h-full flex flex-col">
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <h4 className="text-2xl font-bold">{mapPoints.find(p => p.id === activePoint)?.name}</h4>
                      <p className="text-sm text-muted-foreground">{mapPoints.find(p => p.id === activePoint)?.year}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent/30 text-accent-foreground">
                      Advanced Technology
                    </span>
                  </div>
                  
                  <h5 className="text-lg font-semibold text-secondary mb-3">
                    {mapPoints.find(p => p.id === activePoint)?.technology}
                  </h5>
                  
                  <p className="text-muted-foreground mb-6 flex-grow">
                    {mapPoints.find(p => p.id === activePoint)?.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-primary/20">
                    <button className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                      Learn more about this technology
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><path d="m12 16 4-4-4-4"/><path d="M8 12h8"/></svg>
                  </div>
                  <h4 className="text-xl font-bold mb-2">Explore the Map</h4>
                  <p className="text-muted-foreground max-w-xs">
                    Click on any point on the globe to discover alternative technological developments from African civilizations.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
