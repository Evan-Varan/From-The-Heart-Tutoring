"use client"

import type React from "react"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  BookOpen,
  Calendar,
  ChevronsLeft,
  ChevronsRight,
  CreditCard,
  DollarSign,
  Home,
  Receipt,
  Users,
} from "lucide-react"

// Import heart logo
import heartLogo from "../images/heart-logo.png"

// Utility function for class names
const classNames = (...classes: (string | boolean | undefined)[]): string => {
  return classes.filter(Boolean).join(" ")
}

interface NavItemProps {
  href: string
  icon: React.ElementType
  label: string
  badge?: number
  isCollapsed?: boolean
  isActive?: boolean
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, badge, isCollapsed, isActive }) => {
  return (
    <div className="mb-1">
      <Link
        to={href}
        className={classNames(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
          isCollapsed ? "flex-col gap-1 justify-center px-0 py-2" : "",
          isActive ? "bg-gray-800/50 text-heart-light" : "text-white hover:bg-gray-800/30 hover:text-heart-light",
          !isCollapsed &&
            "hover:bg-gradient-to-r hover:from-heart/10 hover:to-transparent hover:border-l-2 hover:border-heart hover:pl-[calc(0.75rem-1px)]",
        )}
      >
        <div
          className={classNames(
            "flex items-center justify-center w-8 h-8 rounded-md transition-colors duration-200",
            isActive ? "bg-heart/20" : "bg-gray-800/30 hover:bg-heart/20",
          )}
        >
          <Icon
            className={classNames("h-4 w-4", isActive ? "text-heart-light" : "text-heart hover:text-heart-light")}
          />
        </div>
        {!isCollapsed && (
          <span
            className={classNames(
              "font-medium transition-colors duration-200",
              isActive ? "text-heart-light" : "text-white hover:text-heart-light",
            )}
          >
            {label}
          </span>
        )}
        {!isCollapsed && badge && (
          <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-heart/20 px-2 text-xs font-medium text-heart">
            {badge}
          </span>
        )}
        {isCollapsed && (
          <span
            className={classNames("text-xs", isActive ? "text-heart-light" : "text-gray-400 hover:text-heart-light")}
          >
            {label.split(" ")[0]}
          </span>
        )}
        {isCollapsed && badge && (
          <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-heart text-[10px] font-medium text-white">
            {badge}
          </span>
        )}
      </Link>
    </div>
  )
}

export const AdminNavbar: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const location = useLocation()

  return (
    <div
      className={classNames(
        "h-screen flex flex-col border-r border-gray-700 bg-[#0f172a] transition-all duration-300",
        collapsed ? "w-[80px]" : "w-[280px]",
      )}
      data-collapsed={collapsed ? "true" : undefined}
    >
      {/* Header */}
      <div className="flex-shrink-0 pb-0">
        <div
          className={classNames(
            "flex items-center px-4 py-3 bg-[#0f172a]",
            collapsed ? "justify-center" : "justify-between",
          )}
        >
          <Link to="/" className="flex items-center gap-2">
            {!collapsed ? (
              <div className="flex items-center">
                <div className="logo-icon relative w-10 h-10 mr-3 flex items-center justify-center">
                  <div className="heart-pulse absolute w-full h-full top-0 left-0 rounded-full z-0 animate-pulse-custom bg-heart/30"></div>
                  <div className="relative z-10 w-full h-full">
                    <img
                      src={heartLogo || "/placeholder.svg"}
                      alt="Heart Logo"
                      className="w-full h-full object-contain drop-shadow-[0_0_3px_rgba(255,111,97,0.4)] transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline">
                    <span className="text-white text-[0.9rem] font-medium uppercase tracking-wider mr-1">FROM</span>
                    <span className="text-white text-[0.9rem] font-medium uppercase tracking-wider mr-1">THE</span>
                    <span className="text-heart text-[1.8rem] font-bold font-playfair leading-[0.9] mr-2 drop-shadow-sm">
                      Heart
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-[0.9rem] font-semibold uppercase tracking-wider">TUTORING</span>
                    <span className="text-teal text-xs font-medium tracking-wider uppercase">STUDENT PORTAL</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="logo-icon relative w-10 h-10 flex items-center justify-center">
                <div className="heart-pulse absolute w-full h-full top-0 left-0 rounded-full z-0 animate-pulse-custom bg-heart/30"></div>
                <div className="relative z-10 w-full h-full">
                  <img
                    src={heartLogo || "/placeholder.svg"}
                    alt="Heart Logo"
                    className="w-full h-full object-contain drop-shadow-[0_0_3px_rgba(255,111,97,0.4)]"
                  />
                </div>
              </div>
            )}
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto py-2 px-2">
        {/* Main Menu */}
        <div className="py-2">
          {!collapsed && <div className="px-3 py-2 text-gray-400 font-semibold tracking-wider text-xs">MAIN MENU</div>}
          <div>
            <nav>
              <NavItem
                href="/dashboard"
                icon={Home}
                label="Dashboard"
                isCollapsed={collapsed}
                isActive={location.pathname === "/" || location.pathname === "/dashboard"}
              />
              <NavItem
                href="/tutors"
                icon={Users}
                label="Tutors & Staff"
                isCollapsed={collapsed}
                isActive={location.pathname === "/tutors"}
              />
              <NavItem
                href="/students"
                icon={BookOpen}
                label="Students"
                isCollapsed={collapsed}
                isActive={location.pathname === "/students"}
              />
              <NavItem
                href="/calendar"
                icon={Calendar}
                label="Calendar"
                isCollapsed={collapsed}
                isActive={location.pathname === "/calendar"}
              />
            </nav>
          </div>
        </div>

        {/* Collapse/Expand Button between sections */}
        <div className="my-4 px-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={classNames(
              "w-full flex items-center justify-center py-1.5 rounded-md transition-all duration-300 group",
              collapsed
                ? "bg-gray-800/20 hover:bg-gray-800/40"
                : "bg-gradient-to-r from-gray-800/10 to-gray-800/30 hover:from-gray-800/20 hover:to-gray-800/40 border border-gray-700/50",
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <div className="relative flex items-center justify-center">
              {collapsed ? (
                <ChevronsRight className="h-5 w-5 text-teal transition-transform duration-300 group-hover:scale-110" />
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <ChevronsLeft className="h-5 w-5 text-teal transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-xs font-medium text-teal">COLLAPSE MENU</span>
                    <ChevronsRight className="h-5 w-5 text-teal transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </>
              )}
            </div>
          </button>
        </div>

        {/* Finance */}
        <div className="py-2">
          {!collapsed && <div className="px-3 py-2 text-gray-400 font-semibold tracking-wider text-xs">FINANCE</div>}
          <div>
            <nav>
              <NavItem
                href="/invoices"
                icon={Receipt}
                label="Invoices"
                isCollapsed={collapsed}
                isActive={location.pathname === "/invoices"}
              />
              <NavItem
                href="/expenses"
                icon={CreditCard}
                label="Expenses"
                isCollapsed={collapsed}
                isActive={location.pathname === "/expenses"}
              />
              <NavItem
                href="/revenue"
                icon={DollarSign}
                label="Revenue"
                isCollapsed={collapsed}
                isActive={location.pathname === "/revenue"}
              />
            </nav>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={classNames("flex-shrink-0 border-t border-gray-700 bg-gray-900/50", collapsed ? "p-2" : "p-4")}>
        {!collapsed ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-heart to-transparent opacity-30 rounded-full"></div>
            <div className="text-xs text-gray-400">From the Heart Tutoring © {new Date().getFullYear()}</div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="text-heart text-lg">❤</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminNavbar
