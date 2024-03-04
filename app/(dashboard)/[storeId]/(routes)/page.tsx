import ResponsiveChart from "@/components/charts/area-chart"
import CustomChart from "@/components/charts/custom-chart"
import RadarOverview from "@/components/charts/radar-chart"
import TwoLevelPieChart from "@/components/charts/two-level-pie-chart"
import { Heading } from "@/components/heading"
import { Overview } from "@/components/overview"
import { Shell } from "@/components/shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getStoreById } from "@/data/store"
import { CreditCard, DollarSign, Package } from "lucide-react"

interface HomePageProps {
    params: { storeId: string }
}

const HomePage = async ({
    params
}: HomePageProps) => {
    const store = await getStoreById(params.storeId)

    return (
        <Shell>
            <div className="flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <Heading title="Dashboard" />
                    <div className="grid gap-4 grid-cols-3">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Revenue
                                </CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">5 march</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">+100</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Products In Stock</CardTitle>
                                <Package className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">120</div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-4">
                        <Card className="col-span-2">
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <Overview 
                                    data={[
                                        { name: "Jan", total: 1 },
                                        { name: "Feb", total: 2 },
                                        { name: "Mar", total: 3 },
                                        { name: "Apr", total: 4 },
                                        { name: "May", total: 4 },
                                        { name: "Jun", total: 5 },
                                        { name: "Jul", total: 3 },
                                        { name: "Aug", total: 2 },
                                        { name: "Sep", total: 2 },
                                        { name: "Oct", total: 1 },
                                        { name: "Nov", total: 4 },
                                        { name: "Dec", total: 5 },
                                    ]} 
                                />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Radar Chart
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <RadarOverview />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid lg:grid-cols-5 gap-4">
                        <div className="col-span-2 flex items-center gap-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Two Level Pie Chart
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <TwoLevelPieChart />
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Custom Chart
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CustomChart />
                                </CardContent>
                            </Card>
                        </div>
                        <div className="col-span-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Radar Chart
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <ResponsiveChart />
                                </CardContent>
                            </Card>
                        </div>

                    </div>
                </div>
            </div>
        </Shell>
    )
}

export default HomePage