"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import TextareaAutosize from "react-textarea-autosize";
import { MultiStepLoader as Loader } from "../../components/ui/multi-step-loader";
import Sidebar from "@/components/Siderbar";

const loadingStates = [
  { text: "Gathering Project Requirements" },
  { text: "Project Specification Generated" },
  { text: "Project Created" },
  { text: "Local Cloud Started" },
  { text: "Configurations Validated" },
  { text: "Deployment Plan Created" },
  { text: "Creating Visualisation" },
];

interface Message {
  content: string;
  isUser: boolean;
  showButtons?: boolean;
}

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [showIframe, setShowIframe] = useState(false);
  const yesButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessages = [...messages, { content: inputValue, isUser: true }];
    setMessages(newMessages);

    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          content: "Thank you for your message! I'll help you with that.",
          isUser: false,
        },
      ]);

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            content:
              "Would you like to enable automatic backups for data protection, or any additional monitoring configurations?",
            isUser: false,
            showButtons: true,
          },
        ]);
      }, 1000);
    }, 1000);

    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        setShowIframe(true);
      }, loadingStates.length * 2000); // Adjust this value based on your Loader's duration and number of states

      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    if (loading) {
      return;
    }
    const handleEnterKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && document.activeElement?.tagName !== "TEXTAREA") {
        yesButtonRef.current?.click();
      }
    };

    document.addEventListener("keydown", handleEnterKey);

    return () => {
      document.removeEventListener("keydown", handleEnterKey);
    };
  }, []);

  const suggestions = [
    "Create VPC with two subnets",
    "Set CloudWatch alerts for CPU spikes",
    "Set IAM roles for EC2 access",
  ];

  return (
    <div className="min-h-screen w-full flex">
      <Sidebar />
      {messages.length === 0 ? (
        // Initial landing page layout
        <div className="min-h-screen w-full justify-center gap-4 bg-white flex flex-col flex-1 items-center  px-4">
          <div
            className="
          flex flex-col items-center text-2xl font-bold text-gray
          "
          >
            <Image src="/Logo.svg" alt="Logo" width={120} height={120} />
            <h1 className="font-[500] text-black">LeapFrog</h1>
          </div>
          <h1 className="text-4xl  text-black leading-[-1px]">
            What do you want to build?
          </h1>

          <div className="w-full max-w-[43rem] relative my-4">
            <form onSubmit={handleSubmit}>
              <TextareaAutosize
                placeholder="What do you want to build?"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-5 pr-12 py-3 text-base rounded-2xl border border-gray-200 hover:border-gray-300 transition-colors resize-none min-h-[40px]"
                minRows={1}
                maxRows={5}
                rows={1}
              />
              <Button
                type="submit"
                size="icon"
                className={`absolute right-2 bottom-[3.6rem] rounded-full transition-colors ${
                  inputValue
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-[#E7E7E7] text-white"
                }`}
                disabled={!inputValue}
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </form>
            <div className="flex gap-1 justify-center mt-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  onClick={() => setInputValue(suggestion)}
                  key={index}
                  variant="outline"
                  className="rounded-full text-[0.7rem] flex items-center bg-[#f8f8f8]"
                >
                  {suggestion}
                  <Image
                    src="/diagnol.svg"
                    alt="setting"
                    width={35}
                    height={35}
                    className="ml-2"
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-auto p-6">
              <div className="space-y-4 mx-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex items-start ${
                      message.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!message.isUser && (
                      <div className="flex-shrink-0 mr-1 mt-2">
                        <Image
                          src="/bot.png"
                          alt="Bot"
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-3">
                      <div
                        className={`min-w-[80%] rounded-2xl px-6 py-2  ${
                          message.isUser
                            ? "bg-[#f6f6f6] text-black"
                            : "text-gray-900"
                        }`}
                      >
                        {message.content}
                      </div>
                      {message.showButtons && (
                        <div className="flex gap-2 mt-2 ml-5">
                          <Button
                            onClick={() => setLoading(true)}
                            ref={yesButtonRef}
                            className="bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-2 flex"
                          >
                            Yes
                            <Image
                              src="/arrow.svg"
                              alt="setting"
                              width={20}
                              height={20}
                              className=""
                            />
                          </Button>
                          <Button className="bg-black hover:bg-gray-800 text-white rounded-md px-4 py-2">
                            No
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input form at the bottom */}
            <div className="p-4">
              <div className="max-w-3xl mx-auto relative">
                <form onSubmit={handleSubmit}>
                  <TextareaAutosize
                    placeholder="What do you want to build?"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full pl-5 pr-12 py-3 text-base rounded-full border border-gray-200 hover:border-gray-300 transition-colors resize-none min-h-[40px]"
                    minRows={1}
                    maxRows={5}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className={`absolute right-2 bottom-[0.79rem] rounded-full transition-colors ${
                      inputValue
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-[#e7e7e7] text-white cursor-not-allowed"
                    }`}
                    disabled={!inputValue}
                  >
                    <ArrowUp className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Right side - Logo/Loader/Iframe */}
          <div className="w-[60%] border-l flex items-center justify-center bg-gray-50">
            {loading ? (
              <Loader
                loadingStates={loadingStates}
                loading={loading}
                duration={2000}
              />
            ) : showIframe ? (
              <iframe
                src="https://example.com"
                title="Example Website"
                className="w-full h-full border-none"
              />
            ) : (
              <div className="mb-16 flex flex-col items-center text-2xl font-bold text-gray">
                <Image src="/Logo.svg" alt="Logo" width={120} height={120} />
                <h1>LeapFrog</h1>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
