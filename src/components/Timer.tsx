import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimerProps {
  tempoInicial: number; // em segundos
  onTempoEsgotado: () => void;
  pausado?: boolean;
  mostrarAlerta?: boolean;
}

const Timer: React.FC<TimerProps> = ({ 
  tempoInicial, 
  onTempoEsgotado, 
  pausado = false,
  mostrarAlerta = true 
}) => {
  const [tempoRestante, setTempoRestante] = useState(tempoInicial);

  useEffect(() => {
    setTempoRestante(tempoInicial);
  }, [tempoInicial]);

  useEffect(() => {
    if (pausado || tempoRestante <= 0) return;

    const interval = setInterval(() => {
      setTempoRestante(prev => {
        if (prev <= 1) {
          onTempoEsgotado();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tempoRestante, pausado, onTempoEsgotado]);

  const formatarTempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
  };

  const percentualRestante = (tempoRestante / tempoInicial) * 100;
  const isTempoEsgotando = tempoRestante <= 10 && tempoRestante > 0;
  const isTempoEsgotado = tempoRestante === 0;

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-3 sm:p-4 border-2 transition-all duration-300 ${
      isTempoEsgotado 
        ? 'border-red-500 bg-red-50' 
        : isTempoEsgotando 
          ? 'border-orange-500 bg-orange-50' 
          : 'border-slate-200'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
        <div className="flex items-center space-x-2">
          <div className={`p-1.5 sm:p-2 rounded-lg ${
            isTempoEsgotado 
              ? 'bg-red-100' 
              : isTempoEsgotando 
                ? 'bg-orange-100' 
                : 'bg-purple-100'
          }`}>
            {isTempoEsgotando || isTempoEsgotado ? (
              <AlertTriangle className={`w-4 h-4 sm:w-5 sm:h-5 ${
                isTempoEsgotado ? 'text-red-600' : 'text-orange-600'
              }`} />
            ) : (
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
            )}
          </div>
          <span className="text-xs sm:text-sm font-medium text-slate-700">
            {isTempoEsgotado ? 'Tempo Esgotado!' : 'Tempo Restante'}
          </span>
        </div>
        
        <div className={`text-xl sm:text-2xl font-bold ${
          isTempoEsgotado 
            ? 'text-red-600' 
            : isTempoEsgotando 
              ? 'text-orange-600' 
              : 'text-slate-800'
        }`}>
          {formatarTempo(tempoRestante)}
        </div>
      </div>
      
      {/* Barra de Progresso */}
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ${
            isTempoEsgotado 
              ? 'bg-red-500' 
              : isTempoEsgotando 
                ? 'bg-orange-500' 
                : 'bg-gradient-to-r from-purple-500 to-violet-600'
          }`}
          style={{ width: `${percentualRestante}%` }}
        ></div>
      </div>
      
      {/* Alerta de Tempo Esgotando */}
      {mostrarAlerta && isTempoEsgotando && (
        <div className="mt-3 p-2 bg-orange-100 border border-orange-300 rounded-lg">
          <p className="text-orange-700 text-xs sm:text-sm font-medium text-center">
            ⚠️ Tempo esgotando! Apenas {tempoRestante} segundo{tempoRestante !== 1 ? 's' : ''} restante{tempoRestante !== 1 ? 's' : ''}!
          </p>
        </div>
      )}
      
      {/* Mensagem de Tempo Esgotado */}
      {isTempoEsgotado && (
        <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded-lg">
          <p className="text-red-700 text-xs sm:text-sm font-medium text-center">
            🚨 Tempo esgotado! Avançando automaticamente...
          </p>
        </div>
      )}
    </div>
  );
};

export default Timer;