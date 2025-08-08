"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { apiService } from "@/lib/api"

import {
  Droplets,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Users,
  Award,
  Clock,
  Drill,
  FlaskConical,
  Waves,
  Mountain,
  Shield,
  Target,
  Menu,
  X,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HallihughesWebsite() {
  const [quoteForm, setQuoteForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    service_required: '',
    budget_range: '',
    budget_currency: 'USD',
    project_description: '',
    location: '',
  })
  const [quoteLoading, setQuoteLoading] = useState(false)
  const [quoteSuccess, setQuoteSuccess] = useState(false)
  const [quoteError, setQuoteError] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleQuoteSubmit = async (e) => {
    e.preventDefault()
    setQuoteLoading(true)
    setQuoteError('')
    
    try {
      await apiService.createQuote({
        ...quoteForm,
        status: 'pending',
        project_description: quoteForm.project_description || 'No description provided',
      })
      
      setQuoteSuccess(true)
              setQuoteForm({
          first_name: '',
          last_name: '',
          email: '',
          service_required: '',
          budget_range: '',
          budget_currency: 'USD',
          project_description: '',
          location: '',
        })
    } catch (err) {
      setQuoteError(err instanceof Error ? err.message : 'Failed to submit quote request')
    } finally {
      setQuoteLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mountain className="h-8 w-8 text-blue-600" />
            <span className="text-xl sm:text-2xl font-bold text-gray-900">Hallihughes</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#home" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="#services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Services
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>
          
          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get Quote
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 border-solid">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <Link 
                href="#home" 
                className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="#services" 
                className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="#about" 
                className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="#contact" 
                className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                  setMobileMenuOpen(false)
                }}
              >
                Get Quote
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="bg-gradient-to-br from-blue-50 to-slate-100 py-12 sm:py-16 lg:py-32">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Expert Geological & Water Solutions
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  Professional borehole drilling, water treatment, and comprehensive geological services. Ensuring
                  sustainable water access for communities and industries across the region.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <Droplets className="mr-2 h-5 w-5" />
                    Our Services
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="relative order-first lg:order-last">
                <Image
                  src="https://media.istockphoto.com/id/2211422109/photo/deep-foundation-machine-pile-driver-at-construction-site-pile-driven-in-ground-by-vibrating.webp?a=1&b=1&s=612x612&w=0&k=20&c=l5bn2RcPWRqeGrQhumWW3PR2IuxhCD3V1wTm2CkLPXM="
                  alt="Water Borehole drilling machine in operation"
                  width={600}
                  height={500}
                  className="rounded-lg shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Specialized Services</h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Comprehensive geological and water management solutions tailored to meet your specific needs
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Drill className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">Borehole Drilling</CardTitle>
                  <CardDescription>
                    Professional water borehole drilling services using advanced equipment and techniques
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Deep water well drilling
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Geological site assessment
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Pump installation & maintenance
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <FlaskConical className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">Water Treatment</CardTitle>
                  <CardDescription>
                    Advanced water purification and treatment systems for safe, clean water supply
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Water quality testing
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Filtration system design
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Chemical treatment solutions
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Waves className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">Hydrogeological Survey</CardTitle>
                  <CardDescription>Comprehensive groundwater assessment and aquifer mapping services</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Groundwater exploration
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Aquifer characterization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Water resource management
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Target className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">Site Investigation</CardTitle>
                  <CardDescription>
                    Detailed geological and geotechnical site investigations for construction projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Soil analysis & testing
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Foundation recommendations
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Environmental assessment
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Shield className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">Environmental Consulting</CardTitle>
                  <CardDescription>
                    Environmental impact assessment and sustainable water resource planning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Environmental impact studies
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Contamination assessment
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Remediation planning
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Mountain className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">Geological Mapping</CardTitle>
                  <CardDescription>
                    Detailed geological surveys and mapping for resource exploration and planning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Topographical surveys
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Mineral exploration
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      GIS mapping services
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>



        {/* Stats Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-blue-100">Boreholes Drilled</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-blue-100">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">200+</div>
                <div className="text-blue-100">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Support Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 border-solid mx-auto mb-4
        
        <section id="about" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Hallihughes geological team at work"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">About Hallihughes</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  With over 15 years of expertise in geological services, Hallihughes has established itself as a
                  leading provider of water-related geological solutions. Our team of certified geologists and engineers
                  is committed to delivering sustainable water access through innovative drilling techniques and
                  comprehensive water treatment systems.
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <Users className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Expert Team</h3>
                      <p className="text-gray-600 text-sm">Certified geologists and engineers</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Quality Assured</h3>
                      <p className="text-gray-600 text-sm">ISO certified processes and equipment</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Timely Delivery</h3>
                      <p className="text-gray-600 text-sm">Projects completed on schedule</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Safety First</h3>
                      <p className="text-gray-600 text-sm">Comprehensive safety protocols</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Contact Section */}
        <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                Ready to start your geological project? Contact our experts for a consultation
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Our Location</h3>
                    <p className="text-gray-600">
                      Plot 210, Flat 3, Lagos Road
                      <br />
                      Ikorodu, Lagos
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+234 802 606 9958</p>
                    <p className="text-gray-600">+234 813 653 2337</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">aknureni1968@gmail.com</p>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Request a Quote</CardTitle>
                  <CardDescription>
                    Tell us about yow-full px-3 py-2 border border-gray-300 border-solid rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1blue-500 mt-1blue-500 mt-1blue-500 mt-1blue-500 mt-1
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {quoteSuccess && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 border-solid rounded-md">
                      <p className="text-green-800 font-medium">Quote request submitted successfully! We'll get back to you within 24 hours.</p>
                    </div>
                  )}
                  
                  {quoteError && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-800">{quoteError}</p>
                    </div>
                  )}

                  <form onSubmit={handleQuoteSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <Input 
                          id="firstName" 
                          placeholder="John" 
                          value={quoteForm.first_name}
                          onChange={(e) => setQuoteForm({ ...quoteForm, first_name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <Input 
                          id="lastName" 
                          placeholder="Doe" 
                          value={quoteForm.last_name}
                          onChange={(e) => setQuoteForm({ ...quoteForm, last_name: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Project Location
                      </label>
                      <Input 
                        id="location" 
                        placeholder="City, State or Country" 
                        value={quoteForm.location}
                        onChange={(e) => setQuoteForm({ ...quoteForm, location: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                        Service Required *
                      </label>
                      <select
                        id="service"
                        className="w-full px-3 py-2 border border-gray-300 border-solid rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={quoteForm.service_required}
                        onChange={(e) => setQuoteForm({ ...quoteForm, service_required: e.target.value })}
                        required
                      >
                        <option value="">Select a service...</option>
                        <option value="borehole-drilling">Borehole Drilling</option>
                        <option value="water-treatment">Water Treatment</option>
                        <option value="hydrogeological-survey">Hydrogeological Survey</option>
                        <option value="site-investigation">Site Investigation</option>
                        <option value="environmental-consulting">Environmental Consulting</option>
                        <option value="geological-mapping">Geological Mapping</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                          Project Budget Range
                        </label>
                        <Input
                          id="budget"
                          placeholder="e.g., 10,000 - 25,000 or Under 50,000"
                          value={quoteForm.budget_range}
                          onChange={(e) => setQuoteForm({ ...quoteForm, budget_range: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                          Currency
                        </label>
                        <select
                          id="currency"
                          className="w-full px-3 py-2 border border-gray-300 border-solid rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={quoteForm.budget_currency}
                          onChange={(e) => setQuoteForm({ ...quoteForm, budget_currency: e.target.value })}
                        >
                          <option value="USD">US Dollar ($)</option>
                          <option value="EUR">Euro (€)</option>
                          <option value="GBP">British Pound (£)</option>
                          <option value="NGN">Nigerian Naira (₦)</option>
                          <option value="CAD">Canadian Dollar (C$)</option>
                          <option value="AUD">Australian Dollar (A$)</option>
                          <option value="JPY">Japanese Yen (¥)</option>
                          <option value="CHF">Swiss Franc (CHF)</option>
                          <option value="CNY">Chinese Yuan (¥)</option>
                          <option value="INR">Indian Rupee (₹)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Please describe your project location, scope, timeline, and any specific requirements..."
                        rows={4}
                        value={quoteForm.project_description}
                        onChange={(e) => setQuoteForm({ ...quoteForm, project_description: e.target.value })}
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={quoteLoading}>
                      {quoteLoading ? 'Submitting...' : 'Request Quote'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mountain className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold">Hallihughes</span>
              </div>
              <p className="text-gray-400">
                Professional geological and water management solutions for sustainable development.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Borehole Drilling
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Water Treatment
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Geological Survey
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Site Investigation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Plot 210, Flat 3, Lagos Road</li>
                <li>Ikorodu, Lagos</li>
                <li>+234 802 606 9958</li>
                <li>+234 813 653 2337</li>
                <li>aknureni1968@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 border-solid mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Hallihughes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
