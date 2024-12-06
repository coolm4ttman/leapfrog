import Sidebar from "@/components/Siderbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function AWSSettings() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="w-full">
        <div className=" mb-6  border-b-2 w-full flex items-center px-4  py-5">
          <h1 className="text-xl font-semibold ">Project Settings</h1>
        </div>
        <div className="max-w-2xl mx-auto p-4 ">
          <Card className="bg-[#fafafa]">
            <CardHeader>
              <CardTitle>AWS</CardTitle>
              <p className="text-sm text-muted-foreground">
                To set up your AWS access key and secret access key, follow{" "}
                <Link href="#" className="text-[#3cc858] hover:underline">
                  these steps
                </Link>
                .
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="access-key">Access Key</Label>
                <Input
                  id="access-key"
                  placeholder="Enter your AWS access key"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secret-key">Secret key</Label>
                <Input
                  id="secret-key"
                  type="password"
                  placeholder="Enter your AWS secret key"
                  className="bg-white"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
