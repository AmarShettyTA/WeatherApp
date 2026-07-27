import React, { useState } from 'react';
import {
  Bike,
  Footprints,
  Umbrella,
  Sun,
  Shirt,
  Sparkles,
  Plane,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Filter,
  ShieldAlert,
  Info,
  Star,
} from 'lucide-react';
import { ActivityRecommendation, ActivityStatus } from '../types';
import { soundFx } from '../utils/audio';

interface PlanningModuleProps {
  recommendations: ActivityRecommendation[];
}

export const PlanningModule: React.FC<PlanningModuleProps> = ({ recommendations }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filtered = recommendations.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    return true;
  });

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'bike':
        return <Bike className="w-5 h-5 text-emerald-400" />;
      case 'footprints':
        return <Footprints className="w-5 h-5 text-emerald-400" />;
      case 'umbrella':
        return <Umbrella className="w-5 h-5 text-emerald-400" />;
      case 'sun':
        return <Sun className="w-5 h-5 text-emerald-400" />;
      case 'shirt':
        return <Shirt className="w-5 h-5 text-emerald-400" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
      case 'plane':
        return <Plane className="w-5 h-5 text-emerald-400" />;
      default:
        return <Info className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getStatusBadge = (status: ActivityStatus) => {
    switch (status) {
      case 'OPTIMAL':
        return (
          <span className="bg-emerald-400 text-black text-[10px] font-mono font-black px-2 py-0.5 uppercase border border-white">
            IDEAL
          </span>
        );
      case 'MODERATE':
        return (
          <span className="bg-amber-400 text-black text-[10px] font-mono font-black px-2 py-0.5 uppercase border border-white">
            MODERATE
          </span>
        );
      case 'NOT_RECOMMENDED':
        return (
          <span className="bg-zinc-800 text-zinc-300 text-[10px] font-mono font-black px-2 py-0.5 uppercase border border-zinc-600">
            NOT REC.
          </span>
        );
      case 'HAZARDOUS':
        return (
          <span className="bg-rose-500 text-white text-[10px] font-mono font-black px-2 py-0.5 uppercase border border-white animate-pulse">
            HAZARDOUS
          </span>
        );
    }
  };

  return (
    <section className="w-full bg-emerald-950 border-4 border-emerald-400 p-5 md:p-6 shadow-brutal-emerald-dark font-mono space-y-5">
      {/* Title & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b-2 border-emerald-800 pb-4">
        <div>
          <h2 className="text-xl font-black text-emerald-400 uppercase tracking-tight flex items-center gap-2">
            <span>⚡</span> ACTIVITY ADVISORY ENGINE
          </h2>
          <p className="text-xs text-emerald-200/80 mt-1 uppercase">
            REAL-TIME METRIC THRESHOLD EVALUATION
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-emerald-300 font-bold flex items-center gap-1 uppercase">
            <Filter className="w-3.5 h-3.5 text-emerald-400" /> CATEGORY:
          </span>
          {['all', 'sports', 'gear', 'daily', 'outdoors'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                soundFx.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-2.5 py-1 border transition uppercase text-xs font-bold ${
                selectedCategory === cat
                  ? 'bg-emerald-400 text-black border-white shadow-brutal-white'
                  : 'bg-zinc-950 text-emerald-300 border-emerald-800 hover:border-emerald-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Advisory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              className="border-2 border-emerald-800 bg-black/60 p-4 flex flex-col justify-between space-y-3 hover:border-emerald-400 transition"
            >
              <div>
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-emerald-950 border border-emerald-700 shrink-0">
                      {renderIcon(item.iconName)}
                    </div>
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                      {item.title}
                    </span>
                  </div>
                  {getStatusBadge(item.status)}
                </div>

                <p className="text-xs font-bold text-white uppercase mt-3">
                  {item.headline}
                </p>
                <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                  {item.reasoning}
                </p>
              </div>

              <div className="pt-2 border-t border-emerald-900 flex items-center justify-between text-[11px] text-emerald-300">
                <span className="truncate pr-2"><strong className="text-emerald-400">TIP:</strong> {item.tip}</span>
                {item.metricValue && (
                  <span className="bg-emerald-900 border border-emerald-600 px-1.5 py-0.5 text-white font-bold shrink-0">
                    {item.metricValue}
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-8 text-center text-xs text-emerald-300">
            NO ADVISORY ITEMS MATCH THE SELECTED FILTER.
          </div>
        )}
      </div>
    </section>
  );
};

