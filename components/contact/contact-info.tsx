"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock, Users, Headphones, MessageCircle, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get detailed help via email",
    details: ["support@whatnext.ai", "partnerships@whatnext.ai"],
    response: "Within 24 hours",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our team",
    details: ["+91 98765 43210", "Mon-Fri, 9 AM - 6 PM IST"],
    response: "Immediate",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Quick answers to your questions",
    details: ["Available 24/7", "AI-powered instant responses"],
    response: "Instant",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
]

const officeInfo = {
  address: "Tech Park, Whitefield, Bangalore, Karnataka 560066, India",
  hours: ["Monday - Friday: 9:00 AM - 6:00 PM IST", "Saturday: 10:00 AM - 4:00 PM IST", "Sunday: Closed"],
  departments: [
    { name: "General Support", email: "support@whatnext.ai" },
    { name: "Partnerships", email: "partnerships@whatnext.ai" },
    { name: "Media Inquiries", email: "media@whatnext.ai" },
    { name: "Careers", email: "careers@whatnext.ai" },
  ],
}

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-8"
    >
      {/* Contact Methods */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">How to Reach Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {contactMethods.map((method, index) => (
            <div key={index} className="flex gap-4 p-4 rounded-lg border">
              <div className={`w-12 h-12 ${method.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <method.icon className={`w-6 h-6 ${method.color}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{method.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{method.description}</p>
                <div className="space-y-1">
                  {method.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-sm font-medium text-gray-700">
                      {detail}
                    </p>
                  ))}
                </div>
                <Badge variant="outline" className="mt-2 text-xs">
                  Response: {method.response}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Office Information */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Office Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Address</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{officeInfo.address}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Office Hours
            </h3>
            <div className="space-y-1">
              {officeInfo.hours.map((hour, index) => (
                <p key={index} className="text-gray-600 text-sm">
                  {hour}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Department Contacts
            </h3>
            <div className="space-y-2">
              {officeInfo.departments.map((dept, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{dept.name}</span>
                  <a href={`mailto:${dept.email}`} className="text-blue-600 hover:underline">
                    {dept.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Need Immediate Help?</h3>
          <div className="space-y-3">
            <Button className="w-full justify-start bg-white text-gray-900 hover:bg-gray-50 border">
              <Headphones className="w-4 h-4 mr-2" />
              Schedule a Call
              <ExternalLink className="w-4 h-4 ml-auto" />
            </Button>
            <Button className="w-full justify-start bg-white text-gray-900 hover:bg-gray-50 border">
              <MessageCircle className="w-4 h-4 mr-2" />
              Start Live Chat
              <ExternalLink className="w-4 h-4 ml-auto" />
            </Button>
            <Button className="w-full justify-start bg-white text-gray-900 hover:bg-gray-50 border">
              <Mail className="w-4 h-4 mr-2" />
              Browse Help Center
              <ExternalLink className="w-4 h-4 ml-auto" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
