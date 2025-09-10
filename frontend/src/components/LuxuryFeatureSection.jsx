import React, { useState, useRef, useEffect } from "react";
/* Enhanced luxury feature rail + tiles with shimmer, flip, pulse, and responsive layout */

import { motion } from "framer-motion";
import { Sparkles, Globe2, Layers, Wallet, Gamepad2, ShoppingBag, Percent, Gift } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { cn } from "../lib/utils";

const railGradient = "bg-gradient-to-r from-sky-400/10 via-violet-400/10 to-orange-400/10";

// Node: circular semi-3D badge (tilt decorations + independent flip content)
const Node = ({ icon: Icon, label, desc, color, backContent, size = "md" }) => {
  const [active, setActive] = useState(false);
  const timerRef = useRef(null);

  const HOLD_MS = 1500;
  const flash = (ms = HOLD_MS) => {
    setActive(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActive(false), ms);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const sizeMap = {
    sm: { box: "w-12 h-12", icon: "w-4 h-4", backIcon: "w-3.5 h-3.5" },
    md: { box: "w-14 h-14", icon: "w-4 h-4", backIcon: "w-3.5 h-3.5" },
    mdp: { box: "w-[60px] h-[60px]", icon: "w-4 h-4", backIcon: "w-3.5 h-3.5" },
    lg: { box: "w-[72px] h-[72px]", icon: "w-[20px] h-[20px]", backIcon: "w-4 h-4" },
    xl: { box: "w-20 h-20", icon: "w-[22px] h-[22px]", backIcon: "w-4 h-4" },
    xxl: { box: "w-[88px] h-[88px]", icon: "w-[22px] h-[22px]", backIcon: "w-4 h-4" },
  };
  const sizes = sizeMap[size] || sizeMap.md;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "group relative",
              sizes.box,
            )}
            onMouseEnter={() => { setActive(true); if (timerRef.current) clearTimeout(timerRef.current); }}
            onMouseLeave={() => { if (timerRef.current) clearTimeout(timerRef.current); timerRef.current = setTimeout(() => setActive(false), HOLD_MS); }}
            onPointerDown={() => { setActive(true); if (timerRef.current) clearTimeout(timerRef.current); }}
            onPointerUp={() => { if (timerRef.current) clearTimeout(timerRef.current); timerRef.current = setTimeout(() => setActive(false), HOLD_MS); }}
            onPointerCancel={() => { if (timerRef.current) clearTimeout(timerRef.current); timerRef.current = setTimeout(() => setActive(false), HOLD_MS); }}
          >
            {/* Tilted decorative layer (border, glow, gloss) - separate from content */}
            <motion.div
              className={cn(
                "absolute inset-0 rounded-full border-[0.25px] flex items-center justify-center",
                "bg-gradient-to-br from-white/70 to-white/30 backdrop-blur-md",
                "shadow-[inset_0_2px_6px_rgba(255,255,255,0.6),_0_4px_10px_rgba(0,0,0,0.12)]",
                color.border
              )}
              style={{ perspective: 600 }}
              initial={{ rotateZ: 0, scale: 1 }}
              animate={active ? { rotateZ: 12, scale: 1.06 } : { rotateZ: 0, scale: 1 }}
              whileHover={{ rotateZ: 12, scale: 1.06 }}
              whileTap={{ rotateZ: 15, scale: 1.08 }}
              transition={{ type: "tween", duration: 0.9, ease: "easeInOut" }}
            >
              {/* Holographic outer aura */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-200"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(125,211,252,0.0), rgba(125,211,252,0.2), rgba(167,139,250,0.2), rgba(52,211,153,0.2), rgba(249,115,22,0.2), rgba(125,211,252,0.0))",
                  filter: "blur(6px)",
                  opacity: active ? 1 : undefined,
                }}
                animate={{ opacity: active ? 0.35 : 0 }}
              />

              {/* Soft inner glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: color.glow }}
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Glossy surface reflection */}
              <motion.div
                aria-hidden
                className="absolute -left-3 top-0 h-full w-6 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 100%)",
                  mixBlendMode: "screen",
                }}
                initial={{ x: -12, opacity: 0 }}
                whileHover={{ x: 24, opacity: 0.65 }}
                whileTap={{ x: 24, opacity: 0.65 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </motion.div>

            {/* Independent flip content layer (not tilted) */}
            <motion.div
              className="absolute inset-0"
              initial={{ rotateY: 0 }}
              animate={active ? { rotateY: 180 } : { rotateY: 0 }}
              whileHover={{ rotateY: 180 }}
              whileTap={{ rotateY: 180 }}
              transition={{ type: "tween", duration: 0.9, ease: "easeInOut" }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front side */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                <Icon className={cn(sizes.icon, color.icon)} />
              </div>
              {/* Back side - icon grid or text based on backContent */}
              <div className="absolute inset-0 grid place-items-center" style={{ transform: "rotateY(180deg) translateZ(1px)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transformOrigin: "50% 50%" }}>
                {backContent ? (
                  <div className="grid grid-cols-3 gap-[2px] items-center justify-center">
                    {backContent.map((Item, idx) => (
                      <div key={idx} className="flex items-center justify-center">
                        <Item className={cn(sizes.backIcon, "text-slate-800")} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-[10px] leading-none text-center font-semibold text-slate-800">{desc}</span>
                )}
              </div>
            </motion.div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-white text-slate-900 shadow-xl border" sideOffset={8}>
          <div className="text-xs font-semibold">{label}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const GlassTile = ({ icon: Icon, label, color, size = "sm" }) => {
  const sizeMap = { sm: "h-3 w-3", md: "h-4 w-4", lg: "h-6 w-6" };
  const containerSizeMap = { sm: "h-[18px] w-[18px]", md: "h-5 w-5", lg: "h-6 w-6" };
  const iconSize = sizeMap[size] || sizeMap.sm;
  const containerSize = containerSizeMap[size] || containerSizeMap.sm;
  return (
    <div className="glass-tile-clean group relative w-full px-1 py-1 text-center bg-transparent">
      <div className={cn("mx-auto mb-1 flex items-center justify-center", containerSize)}>
        <Icon className={cn(iconSize, color.icon)} />
      </div>
      <div className="text-[10px] font-semibold text-slate-700 truncate" dir="rtl">
        {label}
      </div>
    </div>
  );
};

const colors = {
  blue: { border: "border-sky-500/50", icon: "text-sky-600", glow: "0 0 0 2px rgba(14,165,233,0.25) inset" },
  purple: { border: "border-violet-500/50", icon: "text-violet-600", glow: "0 0 0 2px rgba(139,92,246,0.25) inset" },
  green: { border: "border-emerald-500/50", icon: "text-emerald-600", glow: "0 0 0 2px rgba(16,185,129,0.25) inset" },
  orange: { border: "border-orange-500/50", icon: "text-orange-600", glow: "0 0 0 2px rgba(249,115,22,0.25) inset" },
};

export default function LuxuryFeatureSection() {
  const shoppingTileRef = useRef(null);
  const pairRowRef = useRef(null);
  const [pairOffset, setPairOffset] = useState(0);
  const categoriesColRef = useRef(null);
  const leftColRef = useRef(null);
  const [leftOffset, setLeftOffset] = useState(0);
  const giftTileRef = useRef(null);
  const discountTileRef = useRef(null);
  const [giftLeft, setGiftLeft] = useState(0);

  useEffect(() => {
    const align = () => {
      if (!shoppingTileRef.current || !pairRowRef.current) return;
      // center Gift between Shopping and Discount
      if (shoppingTileRef.current && giftTileRef.current && discountTileRef.current) {
        const s = shoppingTileRef.current.getBoundingClientRect();
        const g = giftTileRef.current.getBoundingClientRect();
        const d = discountTileRef.current.getBoundingClientRect();
        // place Gift at the mid X between Shopping and Discount WITHOUT overlapping by keeping equal gaps
        const targetCenter = (s.left + s.width / 2 + d.left + d.width / 2) / 2;
        const newLeft = Math.round(targetCenter - g.width / 2);
        setGiftLeft(newLeft - g.left);
      }

      const s = shoppingTileRef.current.getBoundingClientRect();
      const p = pairRowRef.current.getBoundingClientRect();
      const dy = Math.round((s.top + s.height / 2) - (p.top + p.height / 2));
      setPairOffset(dy);

      if (categoriesColRef.current && leftColRef.current) {
        const cat = categoriesColRef.current.getBoundingClientRect();
        const left = leftColRef.current.getBoundingClientRect();
        const dx = Math.round((cat.left + cat.width / 2) - (left.left + left.width / 2));
        setLeftOffset(dx);
      }
    };
    align();
    const ro = new ResizeObserver(() => align());
    if (shoppingTileRef.current) ro.observe(shoppingTileRef.current);
    if (pairRowRef.current) ro.observe(pairRowRef.current);
    window.addEventListener('resize', align);
    const id = setTimeout(align, 0);
    return () => {
      clearTimeout(id);
      window.removeEventListener('resize', align);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="w-full" dir="rtl">
      {/* Holographic shimmer background behind rail */}
      <div className="relative">
        <motion.div
          aria-hidden
          className={cn("absolute -inset-x-6 -top-2 h-12 blur-sm opacity-40", railGradient)}
          animate={{ backgroundPositionX: ["0%", "100%", "0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ backgroundSize: "200% 100%" }}
        />
        {/* Glossy shine sweep over the connecting line (every 4s) */}
        <div className="pointer-events-none absolute left-4 right-4 top-8 h-[2px] overflow-visible z-20">
          <motion.div
            aria-hidden
            className="absolute -left-10 top-0 h-[2px] w-24 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.95), rgba(255,255,255,0))",
              mixBlendMode: "screen"
            }}
            animate={{ x: ["-10%", "110%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Feature Rail */}
        <div className="relative z-10">
          <div className="relative h-[88px] px-2 pt-[4px]">
            <div
              className="absolute left-4 right-4 top-8 h-px rounded-full"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgb(56,189,248), rgb(139,92,246), rgb(16,185,129), rgb(249,115,22))",
                maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)"
              }}
            />
            <div className="absolute left-4 right-4 top-8 -translate-y-1/2 grid grid-cols-2 gap-6 justify-between pointer-events-none items-start">
              {/* Three nodes */}
              <div className="flex flex-col items-center gap-1 pt-1">
                <Node icon={Layers} label="فئات متعددة" desc="خيارات واسعة" color={colors.purple} backContent={[Wallet, ShoppingBag, Gamepad2]} size="xxl" />
                <div className="text-[10px] font-semibold text-slate-800 truncate">فئات متعددة</div>
              </div>
              <div ref={categoriesColRef} className="relative flex flex-col items-center gap-1">
                <div className="relative top-[4px]">
                  <Node icon={Globe2} label="متوافقة عالميا مع أشهر المنصات والمواقع" desc="استخدام عالمي" color={colors.green} size="mdp" />
                </div>
                <div className="text-[10px] font-semibold text-slate-800 text-center leading-tight mt-[6px]">
                  <span className="block">متوافقة عالميا</span>
                  <span className="block">مع أشهر المنصات والمواقع</span>
                </div>

                {/* دائرة باقات أسفل دائرة التوافق، بدون تحريك أي عنصر آخر */}
                <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2 top-[calc(100%+10px)]">
                  <div className="flex flex-col items-center">
                    <div className="relative inline-block w-[60px] h-[60px]">
                      <Node icon={Sparkles} label="باقات" desc="حزم مرنة" color={colors.orange} size="mdp" />
                      <span aria-hidden className="pointer-events-none absolute -top-1 -right-1 text-orange-600 text-[10px] font-extrabold leading-none select-none">+</span>
                      <span aria-hidden className="pointer-events-none absolute -bottom-1 -left-1 w-[7px] h-[7px] rounded-full border-[1.6px] border-orange-600" />
                    </div>
                    <div className="text-[10px] font-semibold text-slate-800 text-center leading-tight mt-[4px]">
                      <span className="block">باقات متنوعة ومناسبة</span>
                      <span className="block">تبداء من 5$...</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Secondary Row - align columns under Nodes */}
      <div className="mt-3">
        <div className="px-3 grid grid-cols-3 gap-4 items-start">
          {/* Left column under "فئات متعددة" */}
          <div ref={leftColRef} className="flex flex-col items-center gap-2" style={{ transform: `translateX(${leftOffset}px)` }}>
            <GlassTile icon={Wallet} label="مالية" color={colors.blue} size="lg" />
            <GlassTile icon={Gamepad2} label="ألعاب" color={colors.purple} size="lg" />
            <div ref={shoppingTileRef}>
              <GlassTile icon={ShoppingBag} label="تسوّق" color={colors.green} size="lg" />
            </div>
          </div>

          {/* Middle column - Gift centered between Shopping and Discount via equal-width columns */}
          <div className="flex flex-col items-center gap-2">
            <div className="invisible">
              <GlassTile icon={Wallet} label="مالية" color={colors.blue} size="lg" />
            </div>
            <div className="invisible">
              <GlassTile icon={Gamepad2} label="ألعاب" color={colors.purple} size="lg" />
            </div>
            <div>
              <GlassTile icon={Gift} label="هدايا" color={colors.orange} size="lg" />
            </div>
          </div>

          {/* Right column - Discount */}
          <div className="flex flex-col items-center gap-2">
            <div className="invisible">
              <GlassTile icon={Wallet} label="مالية" color={colors.blue} size="lg" />
            </div>
            <div className="invisible">
              <GlassTile icon={Gamepad2} label="ألعاب" color={colors.purple} size="lg" />
            </div>
            <div>
              <GlassTile icon={Percent} label="خصومات" color={colors.green} size="lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 640px) {
          .feature-rail-mobile { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        }
      `}</style>
    </div>
  );
}