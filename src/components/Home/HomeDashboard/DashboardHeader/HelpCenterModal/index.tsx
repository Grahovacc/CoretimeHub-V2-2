'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import styles from './HelpCenterModal.module.scss';
import ReactMarkdown from 'react-markdown';

interface HelpPage {
  text: string;
  images?: string[];
}

interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selected: string;
}

const helpContent: Record<string, HelpPage[]> = {
  Overview: [
    {
      text: `**Welcome to the Overview Dashboard**

This view provides a high-level summary of all Coretime related activity. It's designed to give you an overview of the entire Coretime system: 

- Which cores are renewable this cycle
- The cost efficiency of renewal vs. new purchases
- Insight into the current bulk sale auction
- A history of purchases and renewals

💡 Tip: Use this dashboard to get an overview of the entire system. If you want to register a new project or manage an existing one, use the appropriate dashboard.`,
      images: ['/help/Overview.png', '/help/Overview2.png', '/help/Overview3.png'],
    },
    {
      text: `**Renewable Cores Panel**

This section lists all cores that are eligible for renewal during the current sale cycle. Each item includes:

- Para ID
- Time remaining until the renewal window closes
- The renewal cost in real time

If you can't find your project here, it is either not eligible for renewal or it has already renewed for the current sale cycle. To check its status, go to the '**Managing Existing Project**' dashboard and view the overview of your parachain.


💡 Tip: Renew during the **interlude phase**. Renewals attempted later are not guaranteed to succeed if all cores are sold.`,
      images: ['/help/RenewTutorial.png', '/help/RenewTutorial2.png'],
    },
    {
      text: `**Renewal vs New Core Price Comparison**

This section helps you decide whether to renew a core or purchase a new one based on current pricing:

- Shows the **current auction price** for new cores
- Shows the **renewal price** determined by the previous sale cycle
- Highlights if renewal is cheaper, equal, or more expensive

💡 Tip:  Even if purchasing a new core is cheaper, there is a risk involved, as all cores can sell out quickly and you may end up without one.`,
      images: ['/help/CoreComparison.png', '/help/CoreComparison2.png'],
    },
    {
      text: `**Auction Phase Status**

This widget displays the current auction phase and time progress for the ongoing sale cycle.

Phases:
- **Interlude**: Window to submit renewals before the sale starts.
- **Leadin**: Core prices decrease block-by-block.
- **Fixed Price**: End period of the sale — the price is at its lowest point.

The visual ring shows:
- Progress through the current phase
- When the next phase begins

💡 Tip: Use this to time renewals or new purchases — especially if you're targeting optimal pricing in Leadin or submitting during Interlude.`,
      images: ['/help/AuctionPhaseStatus.png', '/help/AuctionPhaseStatus2.png'],
    },
    {
      text: `**Dutch Auction Chart**

**Dutch Auction Chart**

This graph shows how core prices change over time during the Dutch auction cycle. The auction is divided into the **interlude**, **leadin**, and **fixed price** phases.

Overview:

- **Y-axis**: price in the relay chain currency.
- **X-axis**: block timeline from start to end of the sale cycle.

The auction begins with a high initial price that decreases linearly over the **Leadin** phase. Once the **Fixed Price** phase begins, the price stops decreasing and remains constant. During the **Interlude**, new purchases are no longer accepted, but renewals can still be submitted.

Use this chart to:
- Identify ideal entry points for core purchases.
- Predict when your target price may be reached.
- Understand historical buying behavior from previous cycles.

💡 Tip: Many buyers place bulk orders once prices hit a psychological threshold. If you're waiting too long, you may miss the purchase window entirely — especially in high-demand cycles.
`,
      images: [
        '/help/DutchAuctionChart2.png',
        '/help/DutchAuctionChart3.png',
        '/help/DutchAuctionChart4.png',
      ],
    },
    {
      text: `**Latest Purchase History**

This table lists all recent coretime purchases in the current or recent cycles. Each row includes:

- Para ID
- Buyer address
- Price paid
- Type of purchase (Renewal or New core purchase)
- Timestamp

Go through pages using the pagination at the bottom.

💡 Tip: Use this data to spot patterns, such as bulk buys or aggressive renewals, and adjust your strategy accordingly.`,
      images: ['/help/PurchaseHistoryTable.png', '/help/PurchaseHistoryTable2.png'],
    },
  ],
  'Deploying a new project': [
    {
      text: `**Welcome to the dashboard for deploying a new project**

This view offers a simplified overview intended for new projects that want to purchase a core and deploy.

Here users are able to see the price of a new core from bulk sale as well as track the current bulk sale cycle. 

New projects don't have the option to renew, as they don't own a core yet. Therefore, no renewal-related information is shown on this dashboard.
`
    },
    {
      text: `**Cores Remaining**

This section displays a real-time chart showing how many Coretime units are still available for purchase during the current sale cycle.

What it shows:
- The total number of cores offered at the start of the cycle
- A line graph showing the remaining cores over time
- The current number of available cores (left of the chart)

The graph updates as purchases occur, with each drop representing a new sale. This lets you visually assess demand and competition over time.

💡 Tip: A steep drop early in the sale is a strong signal that high-demand bulk buyers are active. When remaining cores reach 0, the current sale cycle is effectively sold out for new buyers.`,
      images: ['/help/CoreRemaining4.png', '/help/CoreRemaining3.png'],
    },

    {
      text: `**Auction Phase Status**

This widget displays the current auction phase and time progress for the ongoing sale cycle.

Phases:
- **Leadin**: Core prices decrease block-by-block.
- **Fixed Price**: Price is locked; only renewals and late buys happen.
- **Interlude**: Window to submit renewals before the next cycle.

The visual ring shows:
- Progress through the current phase
- When the next phase begins

💡 Tip: Use this to time renewals or new purchases — especially if you're targeting optimal pricing in Leadin or submitting during Interlude.`,
      images: ['/help/AuctionPhaseStatus.png', '/help/AuctionPhaseStatus2.png'],
    },
    {
      text: `**Dutch Auction Chart**

**Dutch Auction Chart**

This interactive graph visualizes how core prices evolve over time within the Dutch auction cycle.

- **Blue curve**: historical or simulated pricing as blocks progress.
- **Green marker**: current block and active core price.
- **Y-axis**: price in DOT.
- **X-axis**: block timeline from start to end of the sale cycle.

The auction begins with a high initial price that decreases linearly over the **Leadin** phase. Once the **Fixed Price** phase begins, the price stops decreasing and remains constant. During the **Interlude**, new purchases are no longer accepted, but renewals can still be submitted.

Use this chart to:
- Identify ideal entry points for core purchases.
- Predict when your target price may be reached.
- Understand historical buying behavior from previous cycles.

💡 Tip: Many buyers place bulk orders once prices hit a psychological threshold. If you're waiting too long, you may miss the purchase window entirely — especially in high-demand cycles.
`,
      images: [
        '/help/DutchAuctionChart2.png',
        '/help/DutchAuctionChart3.png',
        '/help/DutchAuctionChart4.png',
      ],
    },
    {
      text: `**Latest Purchase History**

This table lists all recent coretime purchases in the current or recent cycles. Each row includes:

- Para ID
- Buyer address
- Price paid
- Type of purchase (e.g., Renewal, New, Bulk)
- Timestamp

Click through pages using the pagination at the bottom.

💡 Tip: Use this data to spot patterns, such as bulk buys or aggressive renewals, and adjust your strategy accordingly.`,
      images: ['/help/PurchaseHistoryTable.png', '/help/PurchaseHistoryTable2.png'],
    },
  ],
  'Managing Existing Project': [
    {
      text: `**Renewal Info Card**

This section allows you to manage and renew core allocations for your selected parachain.

Here's what you can do:
- Select a parachain from the dropdown to view its status
- See the current state of the parachain (e.g., Active, Idle, Renewable) along with a description of what that means
- In case the parachain has the potential to renew it willdisplay renewal cost and the deadline to submit the renewal
- Use the **Renew** button to directly initiate a core renewal transaction for the selected parachain

If no core is available for renewal, the Renew button will not appear.

💡 Tip: Submitting your renewal during the interlude phase ensures the best chance of inclusion in the next cycle. Missed renewals could lead to region loss or delays.`,
      images: ['/help/RenewalInfoCard.png', '/help/RenewalInfoCard2.png'],
    },
    {
      text: `**Renewal vs New Core Price Comparison**

This section helps you decide whether to renew a core or purchase a new one based on current pricing:

- Shows the **current auction price** for new cores
- Shows the **calculated renewal price** for your existing cores
- Highlights if renewal is cheaper, equal, or more expensive

If renewing is less efficient, a warning is shown so you can make the best decision financially.

💡 Tip: Prices can shift quickly. Use this comparison to plan ahead or time your renewals strategically.`,
      images: ['/help/CoreComparison.png', '/help/CoreComparison2.png'],
    },
    {
      text: `**Auction Phase Status**

This widget displays the current auction phase and time progress for the ongoing sale cycle.

Phases:
- **Leadin**: Core prices decrease block-by-block.
- **Fixed Price**: Price is locked; only renewals and late buys happen.
- **Interlude**: Window to submit renewals before the next cycle.

The visual ring shows:
- Progress through the current phase
- When the next phase begins

💡 Tip: Use this to time renewals or new purchases — especially if you're targeting optimal pricing in Leadin or submitting during Interlude.`,
      images: ['/help/AuctionPhaseStatus.png', '/help/AuctionPhaseStatus2.png'],
    },
    {
      text: `**Dutch Auction Chart**

**Dutch Auction Chart**

This interactive graph visualizes how core prices evolve over time within the Dutch auction cycle.

- **Blue curve**: historical or simulated pricing as blocks progress.
- **Green marker**: current block and active core price.
- **Y-axis**: price in DOT.
- **X-axis**: block timeline from start to end of the sale cycle.

The auction begins with a high initial price that decreases linearly over the **Leadin** phase. Once the **Fixed Price** phase begins, the price stops decreasing and remains constant. During the **Interlude**, new purchases are no longer accepted, but renewals can still be submitted.

Use this chart to:
- Identify ideal entry points for core purchases.
- Predict when your target price may be reached.
- Understand historical buying behavior from previous cycles.

💡 Tip: Many buyers place bulk orders once prices hit a psychological threshold. If you're waiting too long, you may miss the purchase window entirely — especially in high-demand cycles.
`,
      images: [
        '/help/DutchAuctionChart2.png',
        '/help/DutchAuctionChart3.png',
        '/help/DutchAuctionChart4.png',
      ],
    },
  ],
};

export default function HelpCenterModal({ isOpen, onClose, selected }: HelpCenterModalProps) {
  const [page, setPage] = useState(0);
  const content = helpContent[selected] || [{ text: 'No help content available.' }];

  useEffect(() => {
    if (isOpen) {
      setPage(0);
    }
  }, [isOpen, selected]);

  const next = () => setPage((p) => (p + 1) % content.length);
  const prev = () => setPage((p) => (p - 1 + content.length) % content.length);

  if (!isOpen) return null;

  const current = content[page];

  return (
    <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Help Center</h2>
          <X size={20} className={styles.closeIcon} onClick={onClose} />
        </div>

        <div className={styles.helpBody}>
          <div className={styles.text}>
            <ReactMarkdown>{current.text}</ReactMarkdown>
          </div>

          <div className={styles.images}>
            {current.images?.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Help Step ${page + 1} - Image ${index + 1}`}
                className={styles.helpImage}
              />
            ))}
          </div>
        </div>

        <div className={styles.pagination}>
          <button onClick={prev} disabled={content.length <= 1}>
            Previous
          </button>
          <span>
            {page + 1} / {content.length}
          </span>
          <button onClick={next} disabled={content.length <= 1}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
