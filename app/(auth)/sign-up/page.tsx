import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignUpForm } from "./_components/sign-up-form"
import { PawPrint } from "lucide-react"
import { Suspense } from "react"

const SignUpPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>

        <Card className="lg:w-[500px] w-auto">
            <CardHeader>
                <div className="flex items-center justify-center">
                    <PawPrint className="h-10 w-10" />
                </div>
                <CardTitle className="font-bold">
                    veterp
                </CardTitle>
                <CardDescription>
                    Hoşgeldiniz, gerekli alanları doldurarak kayıt olabilirsiniz.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <SignUpForm />
            </CardContent>
        </Card>
        </Suspense>

    )
}

export default SignUpPage