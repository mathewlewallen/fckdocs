import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@fck/components/ui/accordion';
import { Button } from '@fck/components/ui/Button';
import { PhoneCall } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    question: 'What is Cloud Context?',
    answer:
      'Cloud Context is an AI-powered business platform that combines CRM, CMS, automation, and analytics in one streamlined dashboard.',
  },
  {
    question: 'Who is it for?',
    answer:
      'Cloud Context is built for small teams, growing startups, and modern businesses who want to save time and scale intelligently.',
  },
  {
    question: 'How does AI help me?',
    answer:
      'AI is embedded in workflows, analytics, and decision-making—helping you surface insights and automate repetitive tasks.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Cloud Context offers simple pricing tiers for solo founders, startups, and enterprises—starting at $29/month.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes, we offer a 14-day free trial with no credit card required.',
  },
  {
    question: 'What is the timeline for the beta release?',
    answer:
      'We are currently in beta and will be launching new apps for the platform. In the end, we will integrate all of the apps together.',
  },
  {
    question: 'How do I get started?',
    answer: (
      <>
        To get started, please fill out the form on the{' '}
        <Link href="/contact" className="underline underline-offset-4">
          contact page
        </Link>
        .
      </>
    ),
  },
];

export default function FAQ() {
  return (
    <div className="w-full py-10 lg:py-20">
      <div className="container mx-auto">
        <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="max-w-xl text-left font-regular text-3xl tracking-tighter md:text-5xl">
                This is the start of something new
              </h4>
              <p className="max-w-xl text-left text-lg text-muted-foreground leading-relaxed tracking-tight lg:max-w-lg">
                Everything you need to know about Cloud Context and how it helps
                you grow smarter.
              </p>
            </div>
            <div>
              <Button className="gap-4" variant="outline" asChild>
                <Link href="/contact">
                  Still have questions? Contact us{' '}
                  <PhoneCall className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Accordion Section */}
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        </div>
      </div>
    </div>
  );
}
