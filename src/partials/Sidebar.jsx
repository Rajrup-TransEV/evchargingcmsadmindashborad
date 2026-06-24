import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SidebarLinkGroup from "./SidebarLinkGroup";

// Import icons (you'll need to install lucide-react: npm install lucide-react)
import {
  LayoutDashboard,
  Zap,
  Users,
  Network,
  UserCog,
  Wallet,
  List,
  Settings,
  Plus,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  BarChart3,
  MessageSquare,
  HelpCircle,
  FileText,
  Star,
  RefreshCw,
  CreditCard,
  MapPin,
  UserPlus,
  ListChecks,
  MessageCircle,
  ThumbsUp,
  DollarSign,
  Shield,
  AlertCircle
} from "lucide-react";

function Sidebar({ sidebarOpen, setSidebarOpen, variant = 'default' }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  // Navigation items configuration
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/',
      children: [
        { label: 'Main', path: '/' },
        { label: 'Log Retention List', path: '/logretentionlist' }
      ]
    },
    {
      id: 'charger-ops',
      label: 'Charger OPS',
      icon: Zap,
      children: [
        { label: 'Add Charger', path: '/addcharger', icon: Plus },
        { label: 'List of Chargers', path: '/listofcharger', icon: List },
        // { label: 'Charger Settings', path: '/settings', icon: Settings }
      ]
    },
    {
      id: 'cpo-user-ops',
      label: 'CPO User Ops',
      icon: Users,
      children: [
        { label: 'Create CPO', path: '/createnewuser', icon: UserPlus },
        { label: 'CPO Lists', path: '/listofusers', icon: ListChecks }
      ]
    },
    {
      id: 'hubops',
      label: 'Hubops',
      icon: Network,
      children: [
        { label: 'Add Hub', path: '/addhub', icon: Plus },
        { label: 'List of Hubs', path: '/listofhubs', icon: List },
        { label: 'Update Hub', path: '/updatehub', icon: RefreshCw }
      ]
    },
    {
      id: 'app-user-ops',
      label: 'App User Ops',
      icon: UserCog,
      children: [
        { label: 'List of App Users', path: '/listofappuser', icon: Users },
        { label: 'Reset Password', path: '/resetpassword', icon: RefreshCw },
        { label: 'List of Disputes', path: '/listofforms', icon: AlertCircle },
        { label: 'Help & Support', path: '/helpandsupport', icon: HelpCircle },
        { label: 'Feedback List', path: '/listoffeedback', icon: MessageCircle },
        { label: 'Create FAQ', path: '/faqcreate', icon: FileText },
        { label: 'FAQ List', path: '/faqlist', icon: List },
        { label: 'List of Contacts', path: '/contactlist', icon: Users }
      ]
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: DollarSign,
      path: '/liot',
      isSingle: true
    },
    {
      id: 'min-balance',
      label: 'Set Minimum Balance',
      icon: Wallet,
      path: '/addminbal',
      isSingle: true
    }
  ];

  return (
    <div className="min-w-fit">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden lg:z-auto transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex lg:!flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-[100dvh] overflow-y-scroll lg:overflow-y-auto no-scrollbar w-72 lg:w-20 lg:sidebar-expanded:!w-72 2xl:!w-72 shrink-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-72"
        } ${variant === 'v2' ? 'border-r border-white/10' : 'rounded-r-3xl'}`}
      >
        {/* Decorative gradient line at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        {/* Sidebar header */}
        <div className="flex items-center justify-between px-6 pt-8 pb-6 border-b border-white/10">
          <NavLink end to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
              <img
                src="https://res.cloudinary.com/djvmehyvd/image/upload/v1728105550/f2wo1jiwdtkhouymt94a.png"
                alt="logo"
                className="relative w-10 h-10 object-contain bg-white/10 rounded-xl p-1.5 border border-white/20"
              />
            </div>
            <span className={`text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent transition-all duration-300 ${
              sidebarExpanded ? 'lg:opacity-100 lg:w-auto' : 'lg:opacity-0 lg:w-0 lg:overflow-hidden'
            } 2xl:opacity-100 2xl:w-auto`}>
              Admin Panel
            </span>
          </NavLink>

          <button
            ref={trigger}
            className="lg:hidden text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              item.isSingle ? (
                // Single navigation item (no children)
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white shadow-lg shadow-indigo-500/10 border border-indigo-500/30' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                    }
                  `}
                >
                  <item.icon className={`w-5 h-5 transition-colors ${
                    pathname === item.path ? 'text-indigo-400' : 'text-white/50 group-hover:text-white/80'
                  }`} />
                  <span className={`text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    sidebarExpanded ? 'lg:opacity-100 lg:w-auto' : 'lg:opacity-0 lg:w-0 lg:overflow-hidden'
                  } 2xl:opacity-100 2xl:w-auto`}>
                    {item.label}
                  </span>
                </NavLink>
              ) : (
                // Group with children
                <SidebarLinkGroup
                  key={item.id}
                  activecondition={item.children?.some(child => pathname === child.path) || pathname === item.path}
                >
                  {(handleClick, open) => (
                    <div className="mb-0.5">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick();
                          setSidebarExpanded(true);
                        }}
                        className={`
                          w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group
                          ${open || item.children?.some(child => pathname === child.path) || pathname === item.path
                            ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white shadow-lg shadow-indigo-500/10 border border-indigo-500/30'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                          }
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className={`w-5 h-5 transition-colors ${
                            open || item.children?.some(child => pathname === child.path) || pathname === item.path
                              ? 'text-indigo-400'
                              : 'text-white/50 group-hover:text-white/80'
                          }`} />
                          <span className={`text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                            sidebarExpanded ? 'lg:opacity-100 lg:w-auto' : 'lg:opacity-0 lg:w-0 lg:overflow-hidden'
                          } 2xl:opacity-100 2xl:w-auto`}>
                            {item.label}
                          </span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-all duration-300 ${
                          open ? 'rotate-180 text-indigo-400' : 'text-white/40'
                        } ${sidebarExpanded ? 'lg:block' : 'lg:hidden'} 2xl:block`} />
                      </button>

                      <div className={`overflow-hidden transition-all duration-300 ${
                        open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <ul className="mt-1 ml-4 space-y-0.5 border-l-2 border-white/10 pl-4">
                          {item.children?.map((child) => (
                            <li key={child.path}>
                              <NavLink
                                to={child.path}
                                className={({ isActive }) => `
                                  flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 group
                                  ${isActive 
                                    ? 'text-indigo-400 bg-indigo-500/10' 
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                  }
                                `}
                              >
                                {child.icon && (
                                  <child.icon className={`w-4 h-4 ${
                                    pathname === child.path ? 'text-indigo-400' : 'text-white/40 group-hover:text-white/60'
                                  }`} />
                                )}
                                <span className={`text-sm transition-all duration-300 whitespace-nowrap ${
                                  sidebarExpanded ? 'lg:opacity-100 lg:w-auto' : 'lg:opacity-0 lg:w-0 lg:overflow-hidden'
                                } 2xl:opacity-100 2xl:w-auto`}>
                                  {child.label}
                                </span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </SidebarLinkGroup>
              )
            ))}
          </div>
        </nav>

        {/* Bottom section with expand/collapse and user info */}
        <div className="px-4 py-4 border-t border-white/10">
          {/* Expand / collapse button */}
          <div className="hidden lg:flex items-center justify-between 2xl:hidden">
            <button
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="flex items-center gap-3 text-white/50 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5 w-full"
            >
              <Menu className="w-5 h-5" />
              <span className={`text-sm transition-all duration-300 ${
                sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
              }`}>
                {sidebarExpanded ? 'Collapse' : 'Expand'}
              </span>
            </button>
          </div>

          {/* User profile (optional) */}
          <div className={`flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 ${
            sidebarExpanded ? 'lg:flex' : 'lg:hidden'
          } 2xl:flex`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
              SA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Super Admin</p>
              <p className="text-xs text-white/50 truncate">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;