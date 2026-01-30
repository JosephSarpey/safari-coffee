export interface FAQQuestion {
  question: string;
  answer: string;
}

export interface FAQCategory {
  category: string;
  questions: FAQQuestion[];
}

export const faqs: FAQCategory[] = [
  {
    category: "Products & Quality",
    questions: [
      {
        question: "What makes Safari Roast coffee unique?",
        answer: "Safari Roast sources 100% Arabica beans exclusively from high-altitude Kenyan farms. Our single-origin approach ensures exceptional quality, with each batch carefully roasted to bring out the distinct flavor profiles unique to Kenyan coffee—from bright, fruity notes to rich, chocolatey undertones."
      },
      {
        question: "What roast levels do you offer?",
        answer: "We offer three signature roast levels: Gourmet (Medium Roast) - Balanced and smooth with a well-rounded flavor; Artisan (Light Roast) - Bright acidity with fruity, floral notes; Rich Brew (Dark Roast) - Bold, intense with chocolatey, caramel undertones."
      },
      {
        question: "Are your coffee beans organic?",
        answer: "Yes, our coffee beans are sourced from certified organic farms in Kenya. We prioritize sustainable farming practices that protect both the environment and the farming communities we partner with."
      },
      {
        question: "How should I store my coffee beans?",
        answer: "For optimal freshness, store your coffee beans in an airtight container in a cool, dark place. Avoid refrigeration as moisture can affect the flavor. Whole beans stay fresh for 2-4 weeks, while ground coffee is best used within 1-2 weeks of opening."
      }
    ]
  },
  {
    category: "Ordering & Shipping",
    questions: [
      {
        question: "Do you offer bulk or wholesale orders?",
        answer: "Absolutely! We offer competitive wholesale pricing for cafes, restaurants, offices, and retailers. Visit our Bulk Purchase page or contact our B2B team directly for custom quotes and volume discounts."
      },
      {
        question: "What are your shipping options?",
        answer: "We offer standard and express shipping options. Standard shipping typically takes 5-7 business days, while express shipping delivers within 2-3 business days. Free shipping is available on orders over a certain amount—check our current promotions for details."
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to select international destinations. International shipping times vary by location, typically ranging from 7-14 business days. Please note that customs duties and taxes may apply depending on your country."
      },
      {
        question: "Can I track my order?",
        answer: "Yes! Once your order ships, you'll receive an email with a tracking number. You can also track your order status by logging into your account on our website."
      }
    ]
  },
  {
    category: "Brewing & Preparation",
    questions: [
      {
        question: "What's the best way to brew Safari Roast coffee?",
        answer: "Our coffee shines with various brewing methods! For a clean, bright cup, try pour-over. For a full-bodied experience, French press is excellent. Espresso lovers will appreciate the rich crema our beans produce. We recommend experimenting to find your perfect brew."
      },
      {
        question: "What grind size should I use?",
        answer: "Grind size depends on your brewing method: Coarse grind for French press and cold brew; Medium grind for drip coffee makers and pour-over; Fine grind for espresso and Moka pot. We offer both whole bean and pre-ground options for your convenience."
      },
      {
        question: "What's the ideal coffee-to-water ratio?",
        answer: "A general guideline is 1:15 to 1:17 ratio (1 gram of coffee to 15-17 grams of water). For a standard cup, use about 2 tablespoons (10-12g) of coffee per 6 ounces (180ml) of water. Adjust to your taste preference."
      },
      {
        question: "What water temperature is best for brewing?",
        answer: "The optimal water temperature is between 195°F to 205°F (90°C to 96°C). Water that's too hot can over-extract and create bitterness, while water that's too cool may under-extract, resulting in a weak, sour brew."
      }
    ]
  },
  {
    category: "Account & Support",
    questions: [
      {
        question: "How do I create an account?",
        answer: "Click the 'Join Us' button in the navigation bar. You can register using your email address or sign up quickly with your Google account. Creating an account allows you to track orders, save favorites, and access exclusive member benefits."
      },
      {
        question: "What if I forget my password?",
        answer: "No worries! Click 'Login' and then 'Forgot Password.' Enter your registered email address, and we'll send you a secure link to reset your password."
      },
      {
        question: "How can I contact customer support?",
        answer: "You can reach us through our Contact page, email us directly, or use the chat widget on our website. Our team typically responds within 24 hours during business days."
      },
      {
        question: "Do you have a return or refund policy?",
        answer: "Yes, we stand behind our products. If you're not satisfied with your purchase, please contact us within 14 days of delivery. We'll work with you to make it right, whether through a replacement or refund."
      }
    ]
  }
];
