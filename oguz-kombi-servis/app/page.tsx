"use client";

import { useState, useEffect } from "react";
import {
  Flame,
  WashingMachine,
  Utensils,
  Refrigerator,
  ChefHat,
  Wind,
  ShieldCheck,
  Clock,
  MapPin,
  Phone,
  Star,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Zap,
  Award,
  Users,
  MessageCircle,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TrustItem {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

interface Stat {
  value: string;
  label: string;
}

interface FAQItem {
  q: string;
  a: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PHONE = "0532 669 43 99";
const PHONE_TEL = "tel:+905326694399";
const WA_LINK = "https://wa.me/905326694399";

// ─── Data ────────────────────────────────────────────────────────────────────

const services: Service[] = [
  {
    icon: <Flame className="w-8 h-8" />,
    title: "Kombi",
    description:
      "Tüm marka ve model kombilerde yıllık bakım, arıza tespiti ve parça değişimi yapılmaktadır.",
  },
  {
    icon: <WashingMachine className="w-8 h-8" />,
    title: "Çamaşır Makinesi",
    description:
      "Motor, kapı kilidi, drum ve program kartı arızaları. Yerinde hızlı teşhis ve parça değişimi.",
  },
  {
    icon: <Utensils className="w-8 h-8" />,
    title: "Bulaşık Makinesi",
    description:
      "Su alma, ısıtma ve pompa sorunları dahil tüm arızalar. Parça değişimi ve onarımı güvenceli yapılır.",
  },
  {
    icon: <Refrigerator className="w-8 h-8" />,
    title: "Buzdolabı",
    description:
      "Soğutma sistemi, kompresör ve termostat arızaları. Tüm markalara orijinal parça değişimi.",
  },
  {
    icon: <ChefHat className="w-8 h-8" />,
    title: "Fırın",
    description:
      "Rezistans, termostat ve kontrol sorunları. Hem ankastre hem de solo fırınlarda hizmet verilir.",
  },
  {
    icon: <Wind className="w-8 h-8" />,
    title: "Klima",
    description:
      "Gaz dolumu, filtre temizliği ve arıza onarımı. Sezon öncesi bakım ve parça değişimi yapılır.",
  },
];

const trustItems: TrustItem[] = [
  {
    icon: <ShieldCheck className="w-7 h-7" />,
    title: "Orijinal Parça Garantisi",
    subtitle: "Yetkili servis kalitesinde orijinal yedek parça",
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: "7/24 Teknik Destek",
    subtitle: "Haftasonu ve tatil günleri dahil kesintisiz hizmet",
  },
  {
    icon: <MapPin className="w-7 h-7" />,
    title: "Bursa Merkezli Uzman Kadro",
    subtitle: "Bölgeyi bilen, zamanında gelen teknisyenler",
  },
  {
    icon: <Award className="w-7 h-7" />,
    title: "İşçilik Garantisi",
    subtitle: "Tüm onarımlarda 12 ay işçilik garantisi",
  },
  {
    icon: <Zap className="w-7 h-7" />,
    title: "Aynı Gün Hizmet",
    subtitle: "Sabah arayın, öğleden sonra sorununuz çözülsün",
  },
  {
    icon: <Users className="w-7 h-7" />,
    title: "Deneyimli Ekip",
    subtitle: "15 yılı aşkın sektör tecrübesi",
  },
];

const stats: Stat[] = [
  { value: "5.000+", label: "Tamamlanan İş" },
  { value: "15+", label: "Yıl Tecrübe" },
  { value: "4.9★", label: "Müşteri Puanı" },
  { value: "%98", label: "Memnuniyet" },
];

const faqs: FAQItem[] = [
  {
    q: "Aynı gün servisiniz var mı?",
    a: "Evet. Akşam saatlerine kadar iletilen taleplerinize aynı gün servis sağlıyoruz. Sabah arayın, öğleden sonra teknisyenimiz kapınızda olsun.",
  },
  {
    q: "Parça garantisi veriyor musunuz?",
    a: "Değişen tüm yedek parçalarımız ve işçiliğimiz 12 Ay (1 Yıl) garantilidir. Garanti kapsamındaki arızalarda ücretsiz müdahale yapılır.",
  },
  {
    q: "Hangi bölgelere hizmet veriyorsunuz?",
    a: "Bursa Merkez, Nilüfer, Osmangazi, Yıldırım ve Kestel ilçelerine hizmet vermekteyiz.",
  },
  {
    q: "Randevu için ne yapmam gerekiyor?",
    a: "Sayfamızdaki WhatsApp Randevu formunu doldurun ya da doğrudan 0532 669 43 99 numarasını arayın. Uygun saati birlikte belirleyelim.",
  },
];

const districts = [
  "Nilüfer",
  "Osmangazi",
  "Yıldırım",
  "Kestel",
  "Mudanya",
  "Gemlik",
  "Gürsu",
  "Karacabey",
];

const DEVICES = [
  "Kombi",
  "Çamaşır Makinesi",
  "Bulaşık Makinesi",
  "Buzdolabı",
  "Fırın",
  "Klima",
];

// ─── WhatsApp URL ─────────────────────────────────────────────────────────────

function buildWaUrl(
  name: string,
  phone: string,
  address: string,
  device: string,
  fault: string
): string {
  const text =
    "Merhaba, teknik servis randevusu almak istiyorum.\n\n" +
    "\uD83D\uDC64 \u0130sim: " + name + "\n" +
    "\uD83D\uDCDE Telefon: " + phone + "\n" +
    "\uD83D\uDCCD Adres: " + (address || "-") + "\n" +
    "\uD83D\uDD27 Cihaz: " + device + "\n" +
    "\u26A0\uFE0F Ar\u0131za: " + (fault || "-");
  return WA_LINK + "?text=" + encodeURIComponent(text);
}

// ─── Header ──────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f2356]/95 backdrop-blur-md shadow-2xl shadow-blue-950/50"
          : "bg-[#1e3a8a]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col leading-tight">
              <span
                className="font-black text-white text-lg sm:text-xl lg:text-2xl tracking-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                OĞUZ KOMBİ
              </span>
              <span className="text-[10px] sm:text-xs text-blue-300 font-medium tracking-widest uppercase">
                Beyaz Eşya Teknik Servis · Bursa
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 mr-8">
            {["Hizmetler", "Randevu", "SSS", "İletişim"].map((item) => (
              <a
                key={item}
                href={"#" + item.toLowerCase()}
                className="text-blue-200 hover:text-white text-sm font-medium transition-colors duration-200 tracking-wide"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href={PHONE_TEL}
            className="flex items-center gap-2 bg-[#f97316] hover:bg-[#ea6c0a] active:bg-[#c45d09] text-white font-bold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 active:scale-95 whitespace-nowrap text-sm sm:text-base"
          >
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="hidden sm:inline">{"Hemen Ara · " + PHONE}</span>
            <span className="sm:hidden">Ara</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden ml-3 p-2 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menüyü aç/kapat"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-blue-700/50 py-4">
            {["Hizmetler", "Randevu", "SSS", "İletişim"].map((item) => (
              <a
                key={item}
                href={"#" + item.toLowerCase()}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-blue-200 hover:text-white font-medium transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20"
      style={{
        background:
          "linear-gradient(135deg, #0a1628 0%, #1e3a8a 45%, #1e40af 75%, #0a1e4a 100%)",
      }}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Diagonal accent stripe */}
      <div
        className="absolute right-0 top-0 w-1/3 h-full opacity-5"
        style={{
          background:
            "linear-gradient(135deg, transparent 40%, #f97316 40%, #f97316 60%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              {"Bursa'n\u0131n G\u00fcvenilir Teknik Servisi"}
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {"Bursa'da"}{" "}
              <span className="text-[#f97316] relative">
                Güvenilir
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 300 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 6C50 2 150 1 298 6"
                    stroke="#f97316"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>
              </span>{" "}
              <br />
              Kombi &amp; Beyaz Eşya
              <br />
              Teknik Servisi
            </h1>

            <p className="text-blue-200 text-lg sm:text-xl leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              <strong className="text-white">
                Nilüfer, Osmangazi, Yıldırım, Gürsu ve Kestel
              </strong>{" "}
              bölgelerinde aynı gün yerinde hizmet. Arıza telefonda teşhis,
              kapıda çözüm.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href={PHONE_TEL}
                className="flex items-center justify-center gap-3 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-200 shadow-2xl shadow-orange-500/40 hover:shadow-orange-500/60 hover:scale-105 active:scale-95"
              >
                <Phone className="w-6 h-6" />
                {PHONE}
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#1db954] text-white font-bold px-8 py-4 rounded-2xl text-lg border border-transparent transition-all duration-200 shadow-2xl shadow-green-500/30 hover:scale-105"
              >
                <MessageCircle className="w-6 h-6" />
                {"WhatsApp'tan Yaz"}
              </a>
            </div>

            {/* District tags */}
            <div className="mt-8 flex flex-wrap gap-2 justify-center lg:justify-start">
              {["Nilüfer", "Osmangazi", "Yıldırım", "Kestel","Gürsu"].map((d) => (
                <span
                  key={d}
                  className="flex items-center gap-1 bg-white/10 text-blue-200 text-xs font-medium px-3 py-1.5 rounded-full border border-white/10"
                >
                  <MapPin className="w-3 h-3" />
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Stats Card */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/20 rounded-3xl blur-2xl" />
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 sm:p-10 w-full max-w-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-[#f97316] rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/40">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg leading-tight">
                      Oğuz Teknik Servis
                    </p>
                    <p className="text-blue-300 text-sm">Bursa</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-8">
                  {stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-3xl font-black text-[#f97316] leading-none">
                        {s.value}
                      </p>
                      <p className="text-blue-300 text-xs mt-1 leading-tight">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Review strip */}
                <div className="bg-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white text-sm font-medium">
                    &ldquo;Kombim çok kısa sürede tamir edildi, fiyat çok uygundu.&rdquo;
                  </p>
                  <p className="text-blue-400 text-xs mt-1">— Ahmet K., Nilüfer</p>
                </div>

                {/* Live availability */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-300 text-xs font-medium">
                    Şu an müsait · Anında bağlanın
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-20"
        >
          <path
            d="M0 80V30C240 0 480 60 720 40C960 20 1200 60 1440 30V80H0Z"
            fill="#f8fafc"
          />
        </svg>
      </div>
    </section>
  );
}

// ─── ServiceCard ─────────────────────────────────────────────────────────────

function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group bg-white rounded-3xl p-7 border border-slate-100 hover:border-[#1e3a8a]/30 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 hover:-translate-y-1 cursor-default">
      <div className="w-14 h-14 bg-[#1e3a8a]/10 group-hover:bg-[#1e3a8a] rounded-2xl flex items-center justify-center mb-5 transition-all duration-300">
        <span className="text-[#1e3a8a] group-hover:text-white transition-colors duration-300">
          {service.icon}
        </span>
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
        {service.title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
      <div className="mt-5 flex items-center gap-1 text-[#f97316] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <CheckCircle className="w-4 h-4" />
        <span>Garantili Hizmet</span>
      </div>
    </div>
  );
}

// ─── Brand Marquee ────────────────────────────────────────────────────────────

function BrandMarquee() {
  const band =
    "BOSCH \u2022 VAILLANT \u2022 BAYMAK \u2022 AR\u00c7EL\u0130K \u2022 E.C.A \u2022 VIESSMANN \u2022 BUDERUS";

  return (
    <div
      className="mt-16 overflow-hidden py-4"
      style={{ background: "#1e3a8a" }}
      aria-label="Hizmet verilen markalar"
    >
      <style>{`
        @keyframes oguz-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .oguz-marquee-inner {
          display: flex;
          width: max-content;
          animation: oguz-marquee 24s linear infinite;
          white-space: nowrap;
        }
        .oguz-marquee-inner:hover { animation-play-state: paused; }
      `}</style>
      <div className="oguz-marquee-inner">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "clamp(16px, 2.2vw, 22px)",
              fontWeight: 800,
              letterSpacing: "0.1em",
              color: "#f97316",
              padding: "0 2.5rem",
            }}
          >
            {band}&nbsp;&nbsp;&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────

function Services() {
  return (
    <section id="hizmetler" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-[#f97316] font-bold text-sm uppercase tracking-widest mb-3">
            Yapılan İşlemler
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-[#1e3a8a] mb-4 leading-tight"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Uzmanlaştığımız Hizmetler
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Kombi ve beyaz eşya arızalarında kapıdan kapıya, parça değişimi ve
            onarımı dahil garantili teknik servis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-slate-500 mb-5 text-base">
            Aradığınız hizmeti bulamadınız mı?
          </p>
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-2 bg-[#1e3a8a] hover:bg-[#1e40af] text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-105 shadow-xl shadow-blue-900/30"
          >
            <Phone className="w-5 h-5" />
            Telefonla Danışın
          </a>
        </div>
      </div>

      <BrandMarquee />
    </section>
  );
}

// ─── Appointment Form ─────────────────────────────────────────────────────────

function AppointmentForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    device: "",
    fault: "",
  });
  const [sent, setSent] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit() {
    const { name, phone, device } = form;
    if (!name.trim() || !phone.trim() || !device) {
      alert(
        "Lütfen en azından İsim, Telefon ve Cihaz Türü alanlarını doldurun."
      );
      return;
    }
    window.open(
      buildWaUrl(form.name, form.phone, form.address, form.device, form.fault),
      "_blank"
    );
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  }

  const inputCls =
    "w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-[#1e3a8a]/20 bg-white transition-all duration-200";

  return (
    <section id="randevu" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Info */}
          <div>
            <span className="inline-block text-[#f97316] font-bold text-sm uppercase tracking-widest mb-3">
              Randevu Al
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black text-[#1e3a8a] mb-5 leading-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {"WhatsApp'tan"} Hızlı Randevu
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Formu doldurun, bilgileriniz otomatik olarak{" "}
              {"WhatsApp'a"} aktarılsın. Teknisyenimiz en kısa sürede
              geri döner.
            </p>

            <div className="space-y-4">
              {[
                { icon: <Clock className="w-5 h-5" />, text: "Aynı gün servis imkânı" },
                { icon: <ShieldCheck className="w-5 h-5" />, text: "12 ay parça ve işçilik garantisi" },
                { icon: <MapPin className="w-5 h-5" />, text: "Nilüfer, Osmangazi, Yıldırım, Kestel" },
                { icon: <CheckCircle className="w-5 h-5" />, text: "Tüm marka ve modeller" },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-slate-700">
                  <div className="w-9 h-9 bg-[#1e3a8a]/10 rounded-xl flex items-center justify-center text-[#1e3a8a] flex-shrink-0">
                    {icon}
                  </div>
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form Card */}
          <div
            className="rounded-3xl p-8 sm:p-10 shadow-2xl shadow-blue-900/20"
            style={{
              background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
            }}
          >
            <h3
              className="text-white text-2xl font-black mb-1"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              ⚡ Randevu Formu
            </h3>
            <p className="text-blue-300 text-sm mb-7">
              {"Bilgileriniz WhatsApp'a aktarılacaktır."}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-blue-300 uppercase tracking-widest mb-1.5">
                  İsim Soyisim
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Adınız ve soyadınız"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-blue-300 uppercase tracking-widest mb-1.5">
                  Telefon Numaranız
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="05XX XXX XX XX"
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-blue-300 uppercase tracking-widest mb-1.5">
                  Adres / İlçe &amp; Mahalle
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Örn: Nilüfer / Görükle Mah."
                  className={inputCls}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-blue-300 uppercase tracking-widest mb-1.5">
                  Cihaz Türü
                </label>
                <select
                  name="device"
                  value={form.device}
                  onChange={handleChange}
                  className={inputCls}
                >
                  <option value="">— Seçiniz —</option>
                  {DEVICES.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-blue-300 uppercase tracking-widest mb-1.5">
                  Arıza / Sorun Nedir?
                </label>
                <textarea
                  name="fault"
                  value={form.fault}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Kısaca sorunu açıklayın..."
                  className={inputCls + " resize-y min-h-[80px]"}
                />
              </div>

              <button
                onClick={handleSubmit}
                className={`w-full flex items-center justify-center gap-3 font-black text-white py-4 rounded-2xl text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg ${
                  sent
                    ? "bg-green-500 shadow-green-500/40"
                    : "bg-[#f97316] shadow-orange-500/40 hover:bg-[#ea6c0a]"
                }`}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  letterSpacing: "0.04em",
                  fontSize: "1.05rem",
                }}
              >
                <MessageCircle className="w-5 h-5" />
                {sent ? "WhatsApp Açılıyor... ✓" : "WhatsApp ile Randevu Al"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="sss" className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-[#f97316] font-bold text-sm uppercase tracking-widest mb-3">
            Merak Edilenler
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-[#1e3a8a] leading-tight"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Sıkça Sorulan Sorular
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200"
                  style={{
                    background: isOpen ? "#1e3a8a" : "#ffffff",
                    color: isOpen ? "#ffffff" : "#1e293b",
                  }}
                >
                  <span className="font-bold text-base leading-snug">{item.q}</span>
                  <ChevronDown
                    className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      color: isOpen ? "#f97316" : "#94a3b8",
                    }}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 py-5 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Arayın ya da Yazın",
      desc: "Telefon veya WhatsApp ile bize ulaşın. Arızanızı kısaca anlatın.",
    },
    {
      num: "02",
      title: "Ön Teşhis",
      desc: "Deneyimli teknisyenimiz telefonda ön teşhis yapar, randevu ayarlar.",
    },
    {
      num: "03",
      title: "Yerinde Müdahale",
      desc: "En kısa sürede adresinize gelir, sorunu yerinde çözeriz.",
    },
    {
      num: "04",
      title: "12 Ay Garanti",
      desc: "Parça ve işçilik garantisi ile cihazınızı teslim alırsınız.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-[#f97316] font-bold text-sm uppercase tracking-widest mb-3">
            Süreç
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-[#1e3a8a] mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Nasıl Çalışıyoruz?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.num} className="relative text-center">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#1e3a8a]/30 to-transparent z-0" />
              )}
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#1e3a8a] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xl shadow-blue-900/30">
                  <span
                    className="text-[#f97316] font-black text-2xl"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {step.num}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-xl mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Trust Signals ────────────────────────────────────────────────────────────

function TrustCard({ item }: { item: TrustItem }) {
  return (
    <div className="flex items-start gap-4 bg-white/10 hover:bg-white/15 border border-white/10 rounded-2xl p-6 transition-all duration-200 backdrop-blur-sm">
      <div className="w-12 h-12 bg-[#f97316] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-500/30">
        <span className="text-white">{item.icon}</span>
      </div>
      <div>
        <h3 className="text-white font-bold text-base leading-tight mb-1">{item.title}</h3>
        <p className="text-blue-300 text-sm leading-relaxed">{item.subtitle}</p>
      </div>
    </div>
  );
}

function TrustSignals() {
  return (
    <section
      id="güven"
      className="py-20 lg:py-28"
      style={{ background: "linear-gradient(180deg, #1e3a8a 0%, #0f2356 100%)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-[#f97316] font-bold text-sm uppercase tracking-widest mb-3">
            Neden Biz?
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Güven Faktörleri
          </h2>
          <p className="text-blue-300 text-lg max-w-xl mx-auto">
            Binlerce Bursa sakininin tercih ettiği teknik servis olmanın
            arkasındaki değerler.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustItems.map((item) => (
            <TrustCard key={item.title} item={item} />
          ))}
        </div>

        {/* Emergency banner */}
        <div className="mt-14 bg-[#f97316]/20 border border-[#f97316]/40 rounded-3xl p-8 sm:p-10 text-center backdrop-blur-sm">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-3 h-3 bg-[#f97316] rounded-full animate-ping" />
            <span className="text-[#f97316] font-bold text-lg uppercase tracking-wide">
              7/24 Acil Teknik Servis
            </span>
          </div>
          <p className="text-blue-200 text-base sm:text-lg mb-6 max-w-lg mx-auto">
            Kombiniz arızalandı mı? Soğuk bir gecede bizi arayın, en kısa sürede
            kapınızdayız.
          </p>
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-3 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-black px-10 py-4 rounded-2xl text-lg sm:text-xl transition-all duration-200 shadow-2xl shadow-orange-500/40 hover:scale-105 active:scale-95"
          >
            <Phone className="w-6 h-6" />
            {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Sticky WhatsApp Button ───────────────────────────────────────────────────

function StickyWA() {
  return (
    <>
      <style>{`
        @keyframes wa-pulse {
          0%   { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.65); opacity: 0; }
        }
        .wa-sticky-wrap {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          width: 58px;
          height: 58px;
        }
        .wa-sticky-wrap::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #25d366;
          animation: wa-pulse 2s ease-out infinite;
        }
        .wa-sticky-inner {
          position: relative;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #25d366;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 22px rgba(37,211,102,0.55);
          transition: transform 0.2s;
        }
        .wa-sticky-wrap:hover .wa-sticky-inner { transform: scale(1.1); }
      `}</style>
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="wa-sticky-wrap"
        aria-label={"WhatsApp'tan iletişime geç"}
      >
        <div className="wa-sticky-inner">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
      </a>
    </>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const seoTags = [
    "Nilüfer Kombi Servisi",
    "Osmangazi Beyaz Eşya Tamiri",
    "Yıldırım Klima Bakımı",
    "Bursa Petek Temizliği",
    "Bursa Kombi Tamiri",
    "Nilüfer Çamaşır Makinesi Servisi",
    "Kestel Buzdolabı Tamiri",
    "Osmangazi Çamaşır Makinesi Tamiri",
  ];

  return (
    <footer id="iletişim" className="bg-[#0a1628] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <p
                className="font-black text-3xl text-white tracking-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                OĞUZ KOMBİ
              </p>
              <p className="text-[#f97316] font-bold text-sm tracking-widest uppercase mt-0.5">
                Beyaz Eşya Teknik Servis
              </p>
            </div>
            <p className="text-blue-300 text-sm leading-relaxed mb-6">
              Bursa genelinde kombi, çamaşır makinesi, bulaşık makinesi,
              buzdolabı, fırın ve klima tamirinde güvenilir adresiniz. Orijinal
              parça, 12 ay garantili işçilik.
            </p>
            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-2 bg-[#f97316] hover:bg-[#ea6c0a] text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:scale-105"
            >
              <Phone className="w-4 h-4" />
              {PHONE}
            </a>
          </div>

          {/* Districts */}
          <div>
            <h3 className="font-bold text-white text-lg mb-5 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#f97316]" />
              Hizmet Bölgeleri
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {districts.map((d) => (
                <div key={d} className="flex items-center gap-2 text-blue-300 text-sm">
                  <ChevronRight className="w-3 h-3 text-[#f97316] flex-shrink-0" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white text-lg mb-5 flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#f97316]" />
              İletişim
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-blue-300">
                <Phone className="w-4 h-4 text-[#f97316] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">{PHONE}</p>
                  <p>7/24 Teknik Destek Hattı</p>
                </div>
              </div>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-blue-300 hover:text-green-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">WhatsApp Hattı</p>
                  <p>Hızlı randevu için yazın</p>
                </div>
              </a>
              <div className="flex items-start gap-3 text-blue-300">
                <MapPin className="w-4 h-4 text-[#f97316] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Bursa Merkez</p>
                  <p>Nilüfer, Osmangazi, Yıldırım, Kestel</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-blue-300">
                <Clock className="w-4 h-4 text-[#f97316] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">7 Gün 24 Saat</p>
                  <p>Aynı gün servis imkânı</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Tags */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {seoTags.map((tag) => (
              <span key={tag} className="text-[11px] text-slate-600">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-400">
          <p>
            &copy; {new Date().getFullYear()} Oğuz Kombi Beyaz Eşya Teknik
            Servis · Bursa. Tüm hakları saklıdır.
          </p>
          <p className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-green-400" />
            Orijinal Parça · 12 Ay Garantili İşçilik
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&display=swap');
        html { scroll-behavior: smooth; }
      `}</style>

      <Header />
      <StickyWA />

      <main>
        <Hero />
        <Services />
        <AppointmentForm />
        <FAQAccordion />
        <HowItWorks />
        <TrustSignals />
      </main>

      <Footer />
    </>
  );
}