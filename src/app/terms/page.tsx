import PageHeader from "@/components/shared/PageHeader";

export default function TermsPage() {
  return (
    <main>
      <PageHeader title="Terms of Service" backgroundImage="/images/bg_1.jpg" />
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-gray-700 space-y-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold text-black mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and placing an order with Safari Roast, you confirm that you are in agreement with and bound by the terms of service contained in the Terms & Conditions outlined below. These terms apply to the entire website and any email or other type of communication between you and Safari Roast.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">2. Intellectual Property</h2>
            <p>
              Under these Terms, Safari Roast owns all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">3. Restrictions</h2>
            <p>
              You are specifically restricted from all of the following:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Publishing any Website material in any other media;</li>
              <li>Selling, sublicensing and/or otherwise commercializing any Website material;</li>
              <li>Publicly performing and/or showing any Website material;</li>
              <li>Using this Website in any way that is or may be damaging to this Website;</li>
              <li>Using this Website in any way that impacts user access to this Website;</li>
            </ul>

            <h2 className="text-2xl font-bold text-black mb-4">4. Limitation of liability</h2>
            <p>
              In no event shall Safari Roast, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.  Safari Roast, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.
            </p>

            <h2 className="text-2xl font-bold text-black mb-4">5. Revisions</h2>
            <p>
              The materials appearing on Safari Roast's Website could include technical, typographical, or photographic errors. Safari Roast does not warrant that any of the materials on its website are accurate, complete, or current. Safari Roast may make changes to the materials contained on its website at any time without notice.
            </p>

             <h2 className="text-2xl font-bold text-black mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
