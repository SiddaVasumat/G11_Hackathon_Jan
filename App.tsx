import React, { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'

import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { UserRole, UserProfile, FoodItem, FoodStatus } from './types'
import LandingPage from './views/LandingPage'
import LoginPage from './views/LoginPage'
import DonorDashboard from './views/DonorDashboard'
import ShelterDashboard from './views/ShelterDashboard'
import DriverDashboard from './views/DriverDashboard'
import Header from './components/Header'
import { initialFoodItems } from './constants'

const App: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [foodItems, setFoodItems] = useState<FoodItem[]>(initialFoodItems)
  const [loading, setLoading] = useState(true)

  // ✅ Supabase auth listener
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            role: UserRole.DONOR, // temporary default
            fullName: session.user.email!,
          })
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const addFoodItem = (item: FoodItem) => {
    setFoodItems((prev) => [item, ...prev])
  }

  const updateFoodStatus = (
    itemId: string,
    status: FoodStatus,
    extra?: Partial<FoodItem>
  ) => {
    setFoodItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, status, ...extra } : item
      )
    )
  }

  // ✅ Prevent white screen while auth loads
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        {/* ✅ Guard Header */}
        <Header user={user} onLogout={logout} />

        <main className="flex-grow container mx-auto px-4 py-6 max-w-4xl">
          <AnimatePresence mode="wait">
            <Routes>
              {/* Landing */}
              <Route path="/" element={<LandingPage onRoleSelect={() => {}} />} />

              {/* Login */}
              <Route path="/login" element={<LoginPage />} />

              {/* Donor */}
              <Route
                path="/donor"
                element={
                  user ? (
                    <DonorDashboard
                      user={user}
                      foodItems={foodItems}
                      onAdd={addFoodItem}
                    />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              {/* Shelter */}
              <Route
                path="/shelter"
                element={
                  user ? (
                    <ShelterDashboard
                      user={user}
                      foodItems={foodItems}
                      onUpdate={updateFoodStatus}
                    />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />

              {/* Driver */}
              <Route
                path="/driver"
                element={
                  user ? (
                    <DriverDashboard
                      user={user}
                      foodItems={foodItems}
                      onUpdate={updateFoodStatus}
                    />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Routes>
          </AnimatePresence>
        </main>

        <footer className="bg-white/50 border-t py-4 text-center text-sm text-gray-400">
          © 2024 Redistribute Network
        </footer>
      </div>
    </HashRouter>
  )
}

export default App

