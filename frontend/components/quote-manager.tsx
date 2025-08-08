"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Mail, User, Calendar, DollarSign, MapPin, MessageSquare, Eye, FileText, Send } from "lucide-react"
import { apiService, type Quote } from "@/lib/api"

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  reviewing: 'bg-blue-100 text-blue-800',
  quoted: 'bg-green-100 text-green-800',
  accepted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  expired: 'bg-gray-100 text-gray-800',
  resolved: 'bg-purple-100 text-purple-800',
}

const STATUS_WORKFLOW = {
  pending: ['reviewing', 'rejected'],
  reviewing: ['quoted', 'rejected'],
  quoted: ['accepted', 'rejected', 'expired'],
  accepted: ['resolved'],
  rejected: [],
  expired: ['quoted'],
  resolved: [],
}

export function QuoteManager() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null)
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    service_required: 'borehole-drilling' as Quote['service_required'],
    project_description: '',
    location: '',
    status: 'pending' as Quote['status'],
    admin_notes: '',
    quote_amount: '',
    quote_currency: 'USD',
    quote_valid_until: '',
    customer_message: '',
    quote_document: null as File | null,
  })

  const fetchQuotes = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await apiService.getQuotes()
      setQuotes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quotes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setMounted(true)
    fetchQuotes()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (editingQuote) {
        // For updates, only send the fields that have actually changed
        const updateData: Partial<Quote> = {}
        
        if (formData.first_name !== editingQuote.first_name) updateData.first_name = formData.first_name
        if (formData.last_name !== editingQuote.last_name) updateData.last_name = formData.last_name
        if (formData.email !== editingQuote.email) updateData.email = formData.email
        if (formData.service_required !== editingQuote.service_required) updateData.service_required = formData.service_required
        if (formData.project_description !== editingQuote.project_description) updateData.project_description = formData.project_description
        if (formData.location !== editingQuote.location) updateData.location = formData.location
        if (formData.status !== editingQuote.status) updateData.status = formData.status
        if (formData.admin_notes !== (editingQuote.admin_notes || '')) updateData.admin_notes = formData.admin_notes
        
        // Handle quote_amount conversion
        const newAmount = formData.quote_amount ? parseFloat(formData.quote_amount) : undefined
        if (newAmount !== editingQuote.quote_amount) updateData.quote_amount = newAmount
        
        if (formData.quote_valid_until !== (editingQuote.quote_valid_until || '')) updateData.quote_valid_until = formData.quote_valid_until
        
        await apiService.updateQuote(editingQuote.id!, updateData)
      } else {
        // For new quotes, send all required data
        const quoteData = {
          ...formData,
          quote_amount: formData.quote_amount ? parseFloat(formData.quote_amount) : undefined,
        }
        await apiService.createQuote(quoteData)
      }

      setIsDialogOpen(false)
      setEditingQuote(null)
      resetForm()
      fetchQuotes()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save quote')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this quote?')) return

    setLoading(true)
    setError(null)
    try {
      await apiService.deleteQuote(id)
      fetchQuotes()
      alert('Quote deleted successfully!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete quote')
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async (quote: Quote) => {
    if (!formData.customer_message.trim()) {
      setError('Please enter a message to send to the customer')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const result = await apiService.sendCustomerMessage(quote.id!, formData.customer_message)
      if (result.success) {
        alert(`Message sent successfully to ${quote.email}`)
        setFormData({ ...formData, customer_message: '' })
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (quote: Quote, newStatus: Quote['status']) => {
    setLoading(true)
    setError(null)
    try {
      await apiService.updateQuote(quote.id!, { status: newStatus })
      fetchQuotes()
      alert(`Status updated to: ${newStatus}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status')
    } finally {
      setLoading(false)
    }
  }

  const handleSendQuoteDocument = async (quote: Quote) => {
    setLoading(true)
    setError(null)
    try {
      // Send quote email with document if uploaded
      const result = await apiService.sendQuoteEmail(quote.id!, formData.quote_document || undefined)
      if (result.success) {
        alert(`Quote sent successfully to ${quote.email}`)
        
        // Update status to quoted
        await apiService.updateQuote(quote.id!, { status: 'quoted' })
        fetchQuotes()
        
        // Clear the uploaded document
        setFormData({ ...formData, quote_document: null })
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send quote')
    } finally {
      setLoading(false)
    }
  }

  const handleViewDetails = (quote: Quote) => {
    setSelectedQuote(quote)
    // Load quote data into form for editing
    setFormData({
      ...formData,
      admin_notes: quote.admin_notes || '',
      quote_amount: quote.quote_amount?.toString() || '',
      quote_currency: quote.quote_currency || 'USD',
      quote_valid_until: quote.quote_valid_until || '',
      customer_message: '',
    })
    setIsDetailDialogOpen(true)
  }

  const handleEdit = (quote: Quote) => {
    setEditingQuote(quote)
    setFormData({
      first_name: quote.first_name,
      last_name: quote.last_name,
      email: quote.email,
      service_required: quote.service_required,
      project_description: quote.project_description,
      location: quote.location,
      status: quote.status,
      admin_notes: quote.admin_notes || '',
      quote_amount: quote.quote_amount?.toString() || '',
      quote_currency: quote.quote_currency || 'USD',
      quote_valid_until: quote.quote_valid_until || '',
      customer_message: '',
      quote_document: null,
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      service_required: 'borehole-drilling' as Quote['service_required'],
      project_description: '',
      location: '',
      status: 'pending',
      admin_notes: '',
      quote_amount: '',
      quote_currency: 'USD',
      quote_valid_until: '',
      customer_message: '',
      quote_document: null,
    })
  }

  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Quote Requests</h2>
          <p className="text-sm sm:text-base text-gray-600">Manage customer quote requests and responses</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingQuote(null); resetForm(); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Quote
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingQuote ? 'Edit Quote' : 'Add New Quote'}</DialogTitle>
              <DialogDescription>
                {editingQuote ? 'Update quote information' : 'Create a new quote request'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="service_required">Service Required</Label>
                <Select value={formData.service_required} onValueChange={(value) => setFormData({ ...formData, service_required: value as Quote['service_required'] })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="borehole-drilling">Borehole Drilling</SelectItem>
                    <SelectItem value="water-treatment">Water Treatment</SelectItem>
                    <SelectItem value="hydrogeological-survey">Hydrogeological Survey</SelectItem>
                    <SelectItem value="site-investigation">Site Investigation</SelectItem>
                                         <SelectItem value="environmental-assessment">Environmental Assessment</SelectItem>
                    <SelectItem value="geological-mapping">Geological Mapping</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="project_description">Project Description</Label>
                <Textarea
                  id="project_description"
                  value={formData.project_description}
                  onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as Quote['status'] })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                                     <SelectContent>
                     <SelectItem value="pending">Pending</SelectItem>
                     <SelectItem value="reviewing">Reviewing</SelectItem>
                     <SelectItem value="quoted">Quoted</SelectItem>
                     <SelectItem value="accepted">Accepted</SelectItem>
                     <SelectItem value="rejected">Rejected</SelectItem>
                     <SelectItem value="expired">Expired</SelectItem>
                     <SelectItem value="resolved">Resolved</SelectItem>
                   </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="admin_notes">Admin Notes</Label>
                <Textarea
                  id="admin_notes"
                  value={formData.admin_notes}
                  onChange={(e) => setFormData({ ...formData, admin_notes: e.target.value })}
                />
              </div>
                             

               <div>
                 <Label htmlFor="customer_message">Message to Customer</Label>
                 <Textarea
                   id="customer_message"
                   placeholder="Send a personalized message to the customer about their quote..."
                   rows={4}
                   value={formData.customer_message}
                   onChange={(e) => setFormData({ ...formData, customer_message: e.target.value })}
                 />
               </div>

               
                             <div className="flex justify-end space-x-2">
                 {editingQuote && formData.customer_message.trim() && (
                   <Button 
                     type="button" 
                     variant="secondary"
                     onClick={() => handleSendMessage(editingQuote)}
                     disabled={loading}
                   >
                     Send Message
                   </Button>
                 )}
                 <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                   Cancel
                 </Button>
                 <Button type="submit" disabled={loading}>
                   {loading ? 'Saving...' : (editingQuote ? 'Update Quote' : 'Create Quote')}
                 </Button>
               </div>
            </form>
          </DialogContent>
                 </Dialog>

         {/* Detailed Quote View Modal */}
         <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
           <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto">
             <DialogHeader>
               <DialogTitle className="flex items-center gap-2">
                 <Eye className="h-5 w-5" />
                 Quote Details
               </DialogTitle>
               <DialogDescription>
                 View and manage quote request details
               </DialogDescription>
             </DialogHeader>
             
             {selectedQuote && (
               <div className="space-y-6">
                 {/* Customer Information */}
                 <div className="grid sm:grid-cols-2 gap-4">
                   <div>
                     <Label className="text-sm font-medium text-gray-700">Customer Name</Label>
                     <p className="text-lg font-semibold">{selectedQuote.first_name} {selectedQuote.last_name}</p>
                   </div>
                   <div>
                     <Label className="text-sm font-medium text-gray-700">Email</Label>
                     <p className="text-lg">{selectedQuote.email}</p>
                   </div>
                 </div>

                 <div className="grid sm:grid-cols-2 gap-4">
                   <div>
                     <Label className="text-sm font-medium text-gray-700">Phone</Label>
                     <p className="text-lg">{selectedQuote.phone || 'Not provided'}</p>
                   </div>
                   <div>
                     <Label className="text-sm font-medium text-gray-700">Location</Label>
                     <p className="text-lg">{selectedQuote.location}</p>
                   </div>
                 </div>

                 {/* Project Information */}
                 <div>
                   <Label className="text-sm font-medium text-gray-700">Service Required</Label>
                   <Badge variant="outline" className="mt-1">{selectedQuote.service_required}</Badge>
                 </div>

                 <div>
                   <Label className="text-sm font-medium text-gray-700">Project Description</Label>
                   <p className="mt-1 text-gray-700 bg-gray-50 p-3 rounded-md">{selectedQuote.project_description}</p>
                 </div>

                 <div className="grid sm:grid-cols-2 gap-4">
                   <div>
                     <Label className="text-sm font-medium text-gray-700">Timeline</Label>
                     <p className="text-lg">{selectedQuote.timeline || 'Not specified'}</p>
                   </div>
                   <div>
                     <Label className="text-sm font-medium text-gray-700">Budget Range</Label>
                     <p className="text-lg">{selectedQuote.budget_range || 'Not specified'}</p>
                   </div>
                 </div>

                 {selectedQuote.additional_notes && (
                   <div>
                     <Label className="text-sm font-medium text-gray-700">Additional Notes</Label>
                     <p className="mt-1 text-gray-700 bg-gray-50 p-3 rounded-md">{selectedQuote.additional_notes}</p>
                   </div>
                 )}

                 {/* Status Management */}
                 <div>
                   <Label className="text-sm font-medium text-gray-700">Current Status</Label>
                   <div className="flex items-center gap-2 mt-1">
                     <Badge className={STATUS_COLORS[selectedQuote.status]}>{selectedQuote.status}</Badge>
                     <Select onValueChange={(value) => handleStatusUpdate(selectedQuote, value as Quote['status'])}>
                       <SelectTrigger className="w-48">
                         <SelectValue placeholder="Update status" />
                       </SelectTrigger>
                       <SelectContent>
                         {STATUS_WORKFLOW[selectedQuote.status]?.map((status) => (
                           <SelectItem key={status} value={status}>
                             {status.charAt(0).toUpperCase() + status.slice(1)}
                           </SelectItem>
                         ))}
                       </SelectContent>
                     </Select>
                   </div>
                 </div>

                                                     {/* Quote Details */}
                   <div className="grid sm:grid-cols-3 gap-4">
                     <div>
                       <Label className="text-sm font-medium text-gray-700">Quote Amount</Label>
                       <Input
                         type="number"
                         step="0.01"
                         placeholder="Enter quote amount"
                         value={formData.quote_amount}
                         onChange={(e) => setFormData({ ...formData, quote_amount: e.target.value })}
                         className="mt-1"
                       />
                     </div>
                     <div>
                       <Label className="text-sm font-medium text-gray-700">Currency</Label>
                       <select
                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1"
                         value={formData.quote_currency}
                         onChange={(e) => setFormData({ ...formData, quote_currency: e.target.value })}
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
                     <div>
                       <Label className="text-sm font-medium text-gray-700">Valid Until</Label>
                       <Input
                         type="date"
                         value={formData.quote_valid_until}
                         onChange={(e) => setFormData({ ...formData, quote_valid_until: e.target.value })}
                         className="mt-1"
                       />
                     </div>
                   </div>

                 {/* Admin Notes */}
                 <div>
                   <Label className="text-sm font-medium text-gray-700">Admin Notes</Label>
                   <Textarea
                     value={formData.admin_notes}
                     onChange={(e) => setFormData({ ...formData, admin_notes: e.target.value })}
                     placeholder="Add internal notes about this quote..."
                     rows={3}
                   />
                 </div>

                 {/* Customer Message */}
                 <div>
                   <Label className="text-sm font-medium text-gray-700">Message to Customer</Label>
                   <Textarea
                     value={formData.customer_message}
                     onChange={(e) => setFormData({ ...formData, customer_message: e.target.value })}
                     placeholder="Send a personalized message to the customer..."
                     rows={3}
                   />
                 </div>

                                   {/* Document Upload */}
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Attach Document (Optional)</Label>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setFormData({ ...formData, quote_document: e.target.files?.[0] || null })}
                      className="cursor-pointer"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Upload PDF, DOC, or DOCX files to attach to the email (max 10MB)
                    </p>
                    {formData.quote_document && (
                      <p className="text-sm text-green-600 mt-1">
                        ✓ {formData.quote_document.name} selected
                      </p>
                    )}
                  </div>

                                   {/* Action Buttons */}
                  <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsDetailDialogOpen(false)}
                    >
                      Close
                    </Button>
                    <Button 
                      variant="outline"
                                             onClick={async () => {
                         try {
                           const updateData: Partial<Quote> = {}
                           if (formData.admin_notes !== (selectedQuote.admin_notes || '')) updateData.admin_notes = formData.admin_notes
                           if (formData.quote_amount !== (selectedQuote.quote_amount?.toString() || '')) {
                             updateData.quote_amount = formData.quote_amount ? parseFloat(formData.quote_amount) : undefined
                           }
                           if (formData.quote_currency !== (selectedQuote.quote_currency || 'USD')) updateData.quote_currency = formData.quote_currency
                           if (formData.quote_valid_until !== (selectedQuote.quote_valid_until || '')) updateData.quote_valid_until = formData.quote_valid_until
                           
                           if (Object.keys(updateData).length > 0) {
                             await apiService.updateQuote(selectedQuote.id!, updateData)
                             fetchQuotes()
                             alert('Quote details updated successfully!')
                           }
                         } catch (err) {
                           setError(err instanceof Error ? err.message : 'Failed to update quote')
                         }
                       }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button 
                      variant="secondary"
                      onClick={() => handleSendMessage(selectedQuote)}
                      disabled={!formData.customer_message.trim()}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                    <Button 
                      onClick={() => handleSendQuoteDocument(selectedQuote)}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Quote
                    </Button>
                  </div>
               </div>
             )}
           </DialogContent>
         </Dialog>
       </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {loading && !quotes.length ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 border-solid mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quotes...</p>
        </div>
      ) : quotes.length === 0 ? (
        <div className="text-center py-8">
          <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No quote requests found</p>
        </div>
      ) : (
                 <div className="grid gap-4">
           {quotes.map((quote) => (
             <Card key={quote.id} className="hover:shadow-md transition-shadow">
               <CardContent className="p-6">
                 <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                   <div className="space-y-3 flex-1">
                     <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                       <div className="flex items-center gap-2">
                         <User className="h-4 w-4 text-gray-500" />
                         <span className="font-semibold text-sm sm:text-base">{quote.first_name} {quote.last_name}</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <Mail className="h-4 w-4 text-gray-500" />
                         <span className="text-xs sm:text-sm text-gray-600">{quote.email}</span>
                       </div>
                     </div>
                     
                     <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                       <div className="flex items-center gap-2">
                         <MapPin className="h-4 w-4 text-gray-500" />
                         <span className="text-xs sm:text-sm text-gray-600">{quote.location}</span>
                       </div>
                       {quote.quote_amount && (
                         <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                           <DollarSign className="h-3 w-3" />
                           {quote.quote_currency === 'USD' ? '$' : 
                            quote.quote_currency === 'EUR' ? '€' : 
                            quote.quote_currency === 'GBP' ? '£' : 
                            quote.quote_currency === 'NGN' ? '₦' : 
                            quote.quote_currency === 'CAD' ? 'C$' : 
                            quote.quote_currency === 'AUD' ? 'A$' : 
                            quote.quote_currency === 'JPY' ? '¥' : 
                            quote.quote_currency === 'CHF' ? 'CHF' : 
                            quote.quote_currency === 'CNY' ? '¥' : 
                            quote.quote_currency === 'INR' ? '₹' : quote.quote_currency}
                           {quote.quote_amount.toLocaleString()}
                         </div>
                       )}
                     </div>
                     
                     <div className="flex flex-wrap items-center gap-2">
                       <Badge variant="outline" className="text-xs">{quote.service_required}</Badge>
                       <Badge className={`text-xs ${STATUS_COLORS[quote.status]}`}>{quote.status}</Badge>
                     </div>
                     
                     <p className="text-xs sm:text-sm text-gray-700 line-clamp-2">{quote.project_description}</p>
                     
                     {quote.admin_notes && (
                       <div className="mt-2 p-2 bg-gray-50 rounded text-xs sm:text-sm text-gray-700">
                         <strong>Admin Notes:</strong> {quote.admin_notes}
                       </div>
                     )}
                   </div>
                   
                   <div className="flex items-center gap-1 sm:gap-2 lg:flex-col lg:items-end">
                     <Button size="sm" variant="outline" onClick={() => handleViewDetails(quote)}>
                       <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                     </Button>
                     <Button size="sm" variant="outline" onClick={() => handleEdit(quote)}>
                       <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4" />
                     </Button>
                     <Button size="sm" variant="secondary" onClick={() => handleSendQuoteDocument(quote)}>
                       <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                     </Button>
                     <Button size="sm" variant="outline" onClick={() => handleDelete(quote.id!)}>
                       <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                     </Button>
                   </div>
                 </div>
               </CardContent>
             </Card>
           ))}
         </div>
      )}
    </div>
  )
} 