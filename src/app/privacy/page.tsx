import PageHeader from "@/components/shared/PageHeader";

export default function PrivacyPage() {
  return (
    <main>
      <PageHeader title="Privacy Policy" backgroundImage="/images/bg_1.jpg" />
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-gray-700 space-y-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-black mb-4">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us. For example, we collect information when you create an account, subscribe to our newsletter, request customer support, or otherwise communicate with us. The types of information we may collect include your name, email address, postal address, credit card information and other contact or identifying information you choose to provide.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">2. How We Use Your Information</h2>
            <p>
              We use the information we collect in various ways, including to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">3. Log Files</h2>
            <p>
              Safari Roast follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">4. Cookies and Web Beacons</h2>
            <p>
              Like any other website, Safari Roast uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">5. Third Party Privacy Policies</h2>
            <p>
              Safari Roast's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
            </p>

             <h2 className="text-2xl font-bold text-black mb-4">6. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
