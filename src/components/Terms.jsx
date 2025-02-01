import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Terms() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6 flex-grow">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-6 text-center text-blue-600 animate-fadeIn">
            Terms and Conditions
          </h1>
          <p className="mb-8 text-lg text-gray-700 leading-relaxed animate-fadeIn">
            Welcome to Prime Rental. These terms and conditions outline the
            rules and regulations for the use of Prime Rental's Website.
          </p>

          <div className="space-y-8">
            <section className="animate-fadeIn">
              <h2 className="text-3xl font-semibold mb-4 text-blue-500">
                Introduction
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                In using this website you are deemed to have read and agreed to
                the following terms and conditions: The following terminology
                applies to these Terms and Conditions, Privacy Statement and
                Disclaimer Notice and any or all Agreements: “Client”, “You” and
                “Your” refers to you, the person accessing this website and
                accepting the Company’s terms and conditions. “The Company”,
                “Ourselves”, “We” and “Us”, refers to our Company. “Party”,
                “Parties”, or “Us”, refers to both the Client and ourselves, or
                either the Client or ourselves. All terms refer to the offer,
                acceptance and consideration of payment necessary to undertake
                the process of our assistance to the Client in the most
                appropriate manner, whether by formal meetings of a fixed
                duration, or any other means, for the express purpose of meeting
                the Client’s needs in respect of provision of the Company’s
                stated services/products, in accordance with and subject to,
                prevailing English Law. Any use of the above terminology or
                other words in the singular, plural, capitalisation and/or
                he/she or they, are taken as interchangeable and therefore as
                referring to same.
              </p>
            </section>

            <section className="animate-fadeIn">
              <h2 className="text-3xl font-semibold mb-4 text-blue-500">
                Disclaimer
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Disclaimer Exclusions and Limitations The information on this
                web site is provided on an “as is” basis. To the fullest extent
                permitted by law, this Company: excludes all representations and
                warranties relating to this website and its contents or which is
                or may be provided by any affiliates or any other third party,
                including in relation to any inaccuracies or omissions in this
                website and/or the Company’s literature; and excludes all
                liability for damages arising out of or in connection with your
                use of this website. This includes, without limitation, direct
                loss, loss of business or profits (whether or not the loss of
                such profits was foreseeable, arose in the normal course of
                things or you have advised this Company of the possibility of
                such potential loss), damage caused to your computer, computer
                software, systems and programs and the data thereon or any other
                direct or indirect, consequential and incidental damages. This
                Company does not however exclude liability for death or personal
                injury caused by its negligence. The above exclusions and
                limitations apply only to the extent permitted by law. None of
                your statutory rights as a consumer are affected.
              </p>
            </section>

            <section className="animate-fadeIn">
              <h2 className="text-3xl font-semibold mb-4 text-blue-500">
                License
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Terms and Conditions In using this website you are deemed to
                have read and agreed to the following terms and conditions: The
                following terminology applies to these Terms and Conditions,
                Privacy Statement and Disclaimer Notice and any or all
                Agreements: “Client”, “You” and “Your” refers to you, the person
                accessing this website and accepting the Company’s terms and
                conditions. “The Company”, “Ourselves”, “We” and “Us”, refers to
                our Company. “Party”, “Parties”, or “Us”, refers to both the
                Client and ourselves, or either the Client or ourselves. All
                terms refer to the offer, acceptance and consideration of
                payment necessary to undertake the process of our assistance to
                the Client in the most appropriate manner, whether by formal
                meetings of a fixed duration, or any other means, for the
                express purpose of meeting the Client’s needs in respect of
                provision of the Company’s stated services/products, in
                accordance with and subject to, prevailing English Law. Any use
                of the above terminology or other words in the singular, plural,
                capitalisation and/or he/she or they, are taken as
                interchangeable and therefore as referring to same.
              </p>
            </section>

            <section className="animate-fadeIn">
              <h2 className="text-3xl font-semibold mb-4 text-blue-500">
                User Comments
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Terms and Conditions Please also visit our Terms and Conditions
                section establishing the use, disclaimers, and limitations of
                liability governing the use of our website at
                https://primeaddis.com Your Consent By using our site, you
                consent to our online privacy policy. Changes to our Privacy
                Policy If we decide to change our privacy policy, we will post
                those changes on this page. https://primeaddid.com Notice: Our
                company operates exclusively under the name of Mr. Natnael
                Yohannes and through the primeaddis.com website. We are not
                responsible for work done through other websites or through
                other agents.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Terms;
