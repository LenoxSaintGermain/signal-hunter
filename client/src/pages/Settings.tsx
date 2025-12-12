import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchConfiguration from "@/components/settings/SearchConfiguration";
import ApiConfiguration from "@/components/settings/ApiConfiguration";
import { Globe, Settings2 } from "lucide-react";

export default function Settings() {
    return (
        <div className="min-h-screen bg-background">
            <Navigation currentPage="/settings" />
            <main className="pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold">Settings & Configuration</h1>
                        <p className="text-muted-foreground mt-2">
                            Manage your acquisition criteria, AI agents, and system preferences.
                        </p>
                    </div>

                    <Tabs defaultValue="discovery" className="space-y-8">
                        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                            <TabsTrigger value="discovery" className="gap-2">
                                <Globe className="w-4 h-4" />
                                Discovery
                            </TabsTrigger>
                            <TabsTrigger value="api" className="gap-2">
                                <Settings2 className="w-4 h-4" />
                                API Config
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="discovery" className="animate-in fade-in-50 duration-300">
                            <SearchConfiguration />
                        </TabsContent>

                        <TabsContent value="api" className="animate-in fade-in-50 duration-300">
                            <ApiConfiguration />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
