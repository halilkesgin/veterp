import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignInForm } from "./_components/sign-in-form"
import { PawPrint } from "lucide-react"
import { Suspense } from "react"

const SignInPage = () => {
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
            Hoşgeldiniz, gerekli alanları doldurarak giriş yapabilirsiniz.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
      </Card>
    </Suspense>
    )
}

export default SignInPage