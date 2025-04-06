import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';
import type { Metadata } from 'next';
import { createMetadata } from '@fck/lib/seo/metadata';

// Optional: SEO Metadata
export const metadata: Metadata = createMetadata({
  title: 'Terms and Conditions – Cloud Context',
  description: 'Key policies and guidelines for using Cloud Context effectively and safely.',
});

const TermsPage = () => {
  return (
    <div className="container mx-auto max-w-5xl py-16">
      {/* Back Navigation */}
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:underline focus:outline-none"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to Home
      </Link>

      {/* Page Heading */}
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        <Balancer>Terms and Conditions</Balancer>
      </h1>

      {/* Subheading */}
      <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
        <Balancer>
          Key policies and guidelines for using our website effectively and safely.
        </Balancer>
      </p>

      {/* Legal Content */}
      <div className="mt-12">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h2>1. Introduction</h2>
          <p>
            By using the website at <strong>cloudcontext.cc</strong>, operated by Cloud Context, you agree to these terms and conditions. Discontinue use if you do not agree.
          </p>

          <h2>2. Intellectual Property Rights</h2>
          <p>
            All intellectual property on the website belongs to Cloud Context or its licensors. You are granted a limited viewing license only.
          </p>

          <h2>3. Restrictions</h2>
          <ul>
            <li>Republishing material from the website</li>
            <li>Selling, sublicensing, or commercializing website material</li>
            <li>Publicly performing or showing any website material</li>
            <li>Using the website in a way that is harmful or illegal</li>
          </ul>

          <h2>4. Your Content</h2>
          <p>
            Your content on the website grants Cloud Context a non-exclusive, worldwide license to use and distribute it. Ensure that your content does not infringe on any third-party rights.
          </p>

          <h2>5. No Warranties</h2>
          <p>
            The website is provided “as is,” and Cloud Context makes no warranties regarding the content and materials.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            Cloud Context is not liable for damages that may occur from your use of the website.
          </p>

          <h2>7. Severability</h2>
          <p>
            If any term is found to be invalid, the remaining terms still apply.
          </p>

          <h2>8. Changes to Terms</h2>
          <p>
            Cloud Context may update these terms and by continuing to use the website, you accept the revised terms.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These terms are governed by the laws of Texas, United States of America, and you agree to the jurisdiction of courts in this location for disputes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
