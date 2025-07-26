"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Mail } from "lucide-react"
import { motion } from "framer-motion"

const teamMembers = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Founder & CEO",
    bio: "Former IIT professor with 15+ years in education technology. PhD in Computer Science from Stanford.",
    image: "/placeholder.svg?height=120&width=120",
    expertise: ["AI/ML", "Education", "Leadership"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "rajesh@whatnext.ai",
    },
  },
  {
    name: "Priya Sharma",
    role: "Co-Founder & CTO",
    bio: "Ex-Google engineer specializing in AI and machine learning. Built scalable systems for millions of users.",
    image: "/placeholder.svg?height=120&width=120",
    expertise: ["AI/ML", "Software Architecture", "Product"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "priya@whatnext.ai",
    },
  },
  {
    name: "Dr. Anita Patel",
    role: "Head of Psychology",
    bio: "Licensed psychologist with expertise in career counseling and student development. 20+ years experience.",
    image: "/placeholder.svg?height=120&width=120",
    expertise: ["Psychology", "Career Counseling", "Assessment"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "anita@whatnext.ai",
    },
  },
  {
    name: "Vikram Singh",
    role: "Head of Product",
    bio: "Product leader with experience at top tech companies. Passionate about creating user-centric solutions.",
    image: "/placeholder.svg?height=120&width=120",
    expertise: ["Product Management", "UX Design", "Strategy"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "vikram@whatnext.ai",
    },
  },
  {
    name: "Meera Reddy",
    role: "Head of Content",
    bio: "Education expert with deep knowledge of Indian curriculum and career paths. Former career counselor.",
    image: "/placeholder.svg?height=120&width=120",
    expertise: ["Education", "Content Strategy", "Career Guidance"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "meera@whatnext.ai",
    },
  },
  {
    name: "Arjun Mehta",
    role: "Head of Engineering",
    bio: "Full-stack engineer with expertise in building scalable platforms. Former tech lead at unicorn startups.",
    image: "/placeholder.svg?height=120&width=120",
    expertise: ["Full-Stack Development", "System Design", "DevOps"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "arjun@whatnext.ai",
    },
  },
]

const advisors = [
  {
    name: "Prof. Sunita Gupta",
    role: "Education Advisor",
    bio: "Former Director of IIT Delhi, expert in Indian education system",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Ravi Krishnan",
    role: "Industry Advisor",
    bio: "Former VP at Microsoft India, 25+ years in tech industry",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Dr. Kavita Jain",
    role: "Psychology Advisor",
    bio: "Renowned child psychologist and career development expert",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export function AboutTeam() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              Our Team
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Meet the People
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}
                Behind WhatNext
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our diverse team combines expertise in technology, psychology, education, and career development to create
              the best possible experience for students.
            </p>
          </motion.div>

          {/* Team Members */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                  <CardContent className="p-8 text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-6">
                      <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="text-lg">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{member.bio}</p>

                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {member.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-center gap-3">
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Twitter className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Advisors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Advisors</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We're guided by industry experts and education leaders who help us stay at the forefront of career
                guidance innovation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {advisors.map((advisor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <Avatar className="w-16 h-16 mx-auto mb-4">
                        <AvatarImage src={advisor.image || "/placeholder.svg"} alt={advisor.name} />
                        <AvatarFallback>
                          {advisor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h4 className="font-bold text-gray-900 mb-1">{advisor.name}</h4>
                      <p className="text-blue-600 text-sm font-medium mb-2">{advisor.role}</p>
                      <p className="text-gray-600 text-sm">{advisor.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
