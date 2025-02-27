'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import SupportChatbot from '@/components/SupportChatbot';
import Image from 'next/image';

// Import the MapComponent dynamically with no SSR to avoid hydration errors
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-lg flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <svg className="animate-spin h-10 w-10 text-primary-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="mt-2 text-gray-600 font-medium">Loading map...</p>
      </div>
    </div>
  )
});

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Only redirect authenticated users
    if (!loading && user) {
      // Redirect to the appropriate dashboard based on user role
      switch (user.role) {
        case 'business':
          router.push('/business/dashboard');
          break;
        case 'provider':
          router.push('/provider/dashboard');
          break;
        case 'government':
          router.push('/government/dashboard');
          break;
        default:
          // No redirect needed for homepage
          break;
      }
    }
  }, [user, loading, router]);

  // Only render after first mount to avoid hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-white">
      {/* Hero Section with Video Background */}
      <header className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
          >
            <source src="/assets/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-primary-600 opacity-70"></div>
        </div>
        
        {/* Nav Bar */}
        <nav className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <span className="text-white text-2xl font-bold">Environmental Solutions</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="#about" className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium">
                About
              </Link>
              <Link href="#features" className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium">
                Services
              </Link>
              <Link href="#coverage" className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium">
                Coverage
              </Link>
              {!user && (
                <Link href="/login">
                  <span className="text-white bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200">
                    Sign In
                  </span>
                </Link>
              )}
              {user && (
                <Link href={`/${user.role}/dashboard`}>
                  <span className="text-white bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200">
                    Dashboard
                  </span>
                </Link>
              )}
            </div>
          </div>
        </nav>
        
        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center max-w-3xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
              Smart Environmental Management
            </h1>
            <p className="max-w-xl mx-auto text-xl text-white text-opacity-90 mb-10">
              Connecting stakeholders through an integrated digital platform for more efficient resource management.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/login">
                <span className="bg-white text-primary-600 hover:bg-gray-100 px-6 py-3 rounded-md text-base font-medium shadow-lg transition-all duration-200">
                  Get Started
                </span>
              </Link>
              <a href="#features" className="text-white border border-white border-opacity-40 hover:bg-white hover:bg-opacity-10 px-6 py-3 rounded-md text-base font-medium transition-all duration-200">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </header>
      
      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
                Innovative Management Solutions
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our platform uses advanced technology to transform how resources are collected, processed, and managed across regions.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                By bringing together all stakeholders in the ecosystem onto a single, secure digital system, we enable more efficient operations and better outcomes.
              </p>
              <div className="flex items-center mt-8">
                <div className="flex-shrink-0">
                  <svg className="h-12 w-12 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">Certified Technology</h3>
                  <p className="mt-1 text-gray-600">
                    Fully compliant with industry standards and regulations
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-64 md:h-auto rounded-lg overflow-hidden shadow-xl">
              <img 
                src="assets\5.png" 
                alt="Environmental initiative" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Enterprise Management Solutions
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our advanced platform connects all stakeholders in the ecosystem.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600 mb-6">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="mt-2 text-xl font-medium text-gray-900">For Organizations</h3>
                <p className="mt-3 text-base text-gray-500">
                  Schedule services, track status in real-time, and maintain compliance with regulations through our intuitive dashboard.
                </p>
                <ul className="mt-4 space-y-2 text-left text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Automated compliance reporting
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Real-time service tracking
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Data analytics and reporting
                  </li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-secondary-100 text-secondary-600 mb-6">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="mt-2 text-xl font-medium text-gray-900">For Service Providers</h3>
                <p className="mt-3 text-base text-gray-500">
                  Optimize routes, manage your fleet efficiently, and ensure proper service delivery with our advanced provider tools.
                </p>
                <ul className="mt-4 space-y-2 text-left text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    AI-powered route optimization
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Real-time fleet management
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Digital documentation system
                  </li>
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="mt-2 text-xl font-medium text-gray-900">For Regulators</h3>
                <p className="mt-3 text-base text-gray-500">
                  Monitor activities, ensure regulatory compliance, and analyze impact through our specialized tools.
                </p>
                <ul className="mt-4 space-y-2 text-left text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Comprehensive oversight dashboard
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Automated regulatory reporting
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Impact analytics and visualization
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Making a Measurable Impact
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our platform in numbers
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 text-center">
              <p className="text-5xl font-bold text-primary-600">95%</p>
              <p className="mt-2 text-lg font-medium text-gray-700">Compliance Rate</p>
              <p className="mt-1 text-sm text-gray-500">Across registered organizations</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 text-center">
              <p className="text-5xl font-bold text-primary-600">10K+</p>
              <p className="mt-2 text-lg font-medium text-gray-700">Resources Managed</p>
              <p className="mt-1 text-sm text-gray-500">Monthly across service areas</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 text-center">
              <p className="text-5xl font-bold text-primary-600">200+</p>
              <p className="mt-2 text-lg font-medium text-gray-700">Organizations</p>
              <p className="mt-1 text-sm text-gray-500">From various sectors</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 text-center">
              <p className="text-5xl font-bold text-primary-600">20+</p>
              <p className="mt-2 text-lg font-medium text-gray-700">Service Providers</p>
              <p className="mt-1 text-sm text-gray-500">Certified and integrated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="coverage" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Service Network
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Comprehensive coverage across regions
            </p>
          </div>

          <div className="mt-12">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              {/* OpenStreetMap with Leaflet */}
              <MapComponent />
              
              <div className="p-6 bg-white">
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-green-600 mr-2"></div>
                    <p className="text-sm text-gray-700">Headquarters</p>
                  </div>
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-blue-600 mr-2"></div>
                    <p className="text-sm text-gray-700">Processing Centers</p>
                  </div>
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-orange-500 mr-2"></div>
                    <p className="text-sm text-gray-700">Recycling Facilities</p>
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-gray-700">
                    Our comprehensive network spans multiple regions, providing coverage to major urban centers, industrial areas, and rural communities. We deliver specialized services tailored to each locality's needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to Transform Waste Management for Your Organization?
            </h2>
            <p className="mt-4 text-xl text-primary-100 max-w-2xl mx-auto">
              Join Goa's leading enterprise waste management platform today
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/login">
                <span className="px-8 py-4 bg-white text-primary-700 font-medium rounded-md shadow-md hover:bg-gray-100 transition-colors duration-200">
                  Get Started Today
                </span>
              </Link>
              <Link href="#contact" className="ml-4">
                <span className="px-8 py-4 border border-white text-white font-medium rounded-md hover:bg-primary-600 transition-colors duration-200">
                  Request Demo
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold">Goa Waste Management Enterprise</h3>
              <p className="mt-2 text-gray-300">
                A comprehensive platform for efficient waste disposal operations between businesses,
                waste collection services, and government oversight across Goa.
              </p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 7h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3h-2v-6h2v1.1c.36-.62 1.06-1.1 1.75-1.1 1.65 0 2.25 1.27 2.25 2.9V17z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-white">About</a></li>
                <li><a href="#features" className="text-gray-300 hover:text-white">Services</a></li>
                <li><a href="#coverage" className="text-gray-300 hover:text-white">Coverage</a></li>
                <li><Link href="/login" className="text-gray-300 hover:text-white">Login</Link></li>
              </ul>
            </div>
            <div id="contact">
              <h4 className="text-lg font-semibold mb-3">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-300">support@goawaste.com</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-300">+91 832-123-4567</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-300">
                    GWME Headquarters<br />
                    Porvorim, Bardez<br />
                    Goa 403521, India
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-300">&copy; 2025 Goa Waste Management Enterprise. All rights reserved.</p>
            <p className="mt-2 text-sm text-gray-400">
              A certified waste management solution provider regulated by the Goa State Pollution Control Board.
            </p>
          </div>
        </div>
      </footer>

      {/* Support Chatbot */}
      <SupportChatbot />
    </div>
  );
}