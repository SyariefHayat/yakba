"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Briefcase, Mail } from "lucide-react";

type Job = {
    _id: string;
    title: string;
    location: string;
    type: "full-time" | "part-time" | "contract" | "internship";
    description: string;
    requirements?: string;
    responsibilities?: string;
    qualifications?: string;
    postedDate: string;
    contactEmail?: string;
};

export default function KarirPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch("/api/jobs?status=active");
                if (res.ok) {
                    const data = await res.json();
                    setJobs(data);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const typeLabels: Record<string, string> = {
        "full-time": "Full Time",
        "part-time": "Part Time",
        "contract": "Kontrak",
        "internship": "Magang"
    };

    const getRelativeTime = (date: string) => {
        const now = new Date();
        const posted = new Date(date);
        const diffInDays = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return "Hari ini";
        if (diffInDays === 1) return "Kemarin";
        if (diffInDays < 7) return `${diffInDays} hari yang lalu`;
        if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} minggu yang lalu`;
        return `${Math.floor(diffInDays / 30)} bulan yang lalu`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Bergabunglah dengan Tim Kami
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Temukan peluang karir yang sesuai dengan passion dan keahlian Anda
                    </p>
                </div>
            </section>

            {/* Jobs Listing */}
            <section className="pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    {isLoading ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">Memuat lowongan...</p>
                        </div>
                    ) : jobs.length === 0 ? (
                        <div className="text-center py-12 bg-card rounded-lg border">
                            <p className="text-muted-foreground">Belum ada lowongan tersedia saat ini.</p>
                            <p className="text-sm text-muted-foreground mt-2">Silakan cek kembali nanti.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {jobs.map((job) => (
                                <div
                                    key={job._id}
                                    className="bg-card border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-bold mb-2">{job.title}</h2>

                                            <div className="flex flex-wrap gap-3 mb-4">
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <MapPin className="w-4 h-4 mr-1" />
                                                    {job.location}
                                                </div>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Briefcase className="w-4 h-4 mr-1" />
                                                    {typeLabels[job.type]}
                                                </div>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Clock className="w-4 h-4 mr-1" />
                                                    {getRelativeTime(job.postedDate)}
                                                </div>
                                            </div>

                                            <p className="text-muted-foreground mb-4 line-clamp-3">
                                                {job.description}
                                            </p>

                                            {job.responsibilities && (
                                                <div className="mb-3">
                                                    <h3 className="font-semibold text-sm mb-2">Tanggung Jawab:</h3>
                                                    <p className="text-sm text-muted-foreground whitespace-pre-line line-clamp-3">
                                                        {job.responsibilities}
                                                    </p>
                                                </div>
                                            )}

                                            {job.requirements && (
                                                <div className="mb-3">
                                                    <h3 className="font-semibold text-sm mb-2">Persyaratan:</h3>
                                                    <p className="text-sm text-muted-foreground whitespace-pre-line line-clamp-3">
                                                        {job.requirements}
                                                    </p>
                                                </div>
                                            )}

                                            {job.qualifications && (
                                                <div className="mb-3">
                                                    <h3 className="font-semibold text-sm mb-2">Kualifikasi:</h3>
                                                    <p className="text-sm text-muted-foreground whitespace-pre-line line-clamp-3">
                                                        {job.qualifications}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col gap-2">
                                            <Badge className="w-fit">{typeLabels[job.type]}</Badge>
                                            {job.contactEmail && (
                                                <Button asChild className="w-full md:w-auto">
                                                    <a href={`mailto:${job.contactEmail}`}>
                                                        <Mail className="w-4 h-4 mr-2" />
                                                        Lamar Sekarang
                                                    </a>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
