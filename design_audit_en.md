# Design Audit & New Flow Concept: GemStudio Marketing Assets

This document outlines the key UX problems in the current GemIQ interface and proposes a new flow concept aimed at drastically increasing user stickiness and driving credit consumption in **GemStudio**.

---

## 🛑 Identified UX Problems (Pain Points)

After analyzing the current interface (**Media** and **Product Details** sections), we have identified 11 critical issues that block users and lower the conversion rate to GemStudio:

### 1. Intent Confusion Upon Upload
When a user uploads a photo in the **Media** tab, the system automatically forces them to create a product (filling in Product Details: price, description, specs).
* **Problem:** This is completely illogical since there is a separate **"Products"** tab specifically designed for creating listings! The "Media" tab should remain an asset management space. This approach creates terrible UX for a user (e.g., SMM specialist or marketer) who just needs to *generate ad creatives* for Google/Meta Ads. They don't need a Shopify listing; they need images. As a result, the user is stuck because there isn't even a simple "Save Photo" button on the screen.

### 2. Poor Discoverability of GemStudio
The button to open GemStudio is hidden inside the photo preview on the product creation screen.
* **Problem:** The user lacks context. How are they supposed to know that clicking this tiny button will allow them to generate multiple stunning backgrounds for ads? The system fails to "sell" this feature or explain exactly what the credits will be spent on.

### 3. Asset Disorganization on the Media Screen
The "Product Media" screen has turned into an unstructured file dump.
* **Problem:** After uploading just one ring and generating a few variations, the user faces complete chaos. Raw (input) photos, on-model images, and removed backgrounds are all thrown into a single pile. It is impossible to tell which assets belong to which product, and there is no clear visual distinction between *Input* (source photo) and *Output* (generated marketing assets).

### 4. Disconnect Between Media and Products (Variations/Duplicates)
On the **Products** tab, clicking "+ Add Product" only provides the options "Capture using GemCam" and "Import from Spreadsheet".
* **Problem:** The user cannot create a new product simply by selecting an existing photo from the Media gallery. Furthermore, it is unclear how to create a product variation (e.g., the exact same ring, but in yellow gold instead of white) using the same media files. The lack of "Create from Media" or "Duplicate Product" options forces the jeweler into doing redundant work.

### 5. Limited Export and Sharing Capabilities (Collections)
On the **Collections** tab, users can group items, but the only available action is "Share Collection" (which generates a link to an embedded product page).
* **Problem:** If the goal of the user (marketer or sales rep) is to generate ad assets in GemStudio for a new jewelry line, they simply need to **download them as a ZIP archive** or share the raw image files via email/messengers. Restricting sharing to a "product page" makes it impossible to use the generated images for external advertising, SMM, or quick client updates, once again devaluing the image generation feature.

### 6. Illogical Bulk Actions and Lack of Folders in Media
When a user selects multiple photos on the **Media** screen, a bulk actions bar appears ("Remove Background", "AI Retouch", "Assign to SKU", "Download", etc.).
* **Problem 1 (Lack of Organization):** The most essential action is missing — "Add to Folder / Collection". The user has no way to organize the chaos.
* **Problem 2 (Inappropriate Tooling):** The system offers "Remove Background" (an editing action) directly in the gallery view. However, background removal or AI retouching typically requires a review of the results. Moreover, within GemStudio itself, generation is often done one photo at a time. This creates severe inconsistency in how the AI tools operate.
* **Problem 3 (Premature Export):** A "Download" button is offered, but because all files (raw and processed) are mixed together, it is extremely difficult for the user to understand exactly what they are downloading.

### 7. Dead-end AI Bulk Actions
When a user executes the "Remove Background" bulk action, a modal window appears showing the AI processing results.
* **Problem:** AI is not perfect and often makes mistakes (e.g., erasing part of the ring or leaving dirty edges, as seen in the screenshots). This causes two critical usability issues:
  1. **Lack of "Before/After":** The user cannot compare the result with the original to quickly check if the AI cut off a vital part of the jewelry.
  2. **Inability to Edit:** The window only provides "Save" buttons. There is no option to correct the result (e.g., by invoking a manual eraser / GemBrush).
This creates a dead-end: the user is forced to either save the ruined images (further cluttering the gallery) or cancel the entire bulk action, completely negating the value of Bulk Actions.

### 8. Inappropriate Quick Actions for New Uploads
When hovering over a freshly uploaded (raw) photo in the gallery, the most prominent quick action (icon over the photo) is "Download".
* **Problem:** This defies logic. Why would a user want to download a photo they literally just uploaded from their own device? The primary Quick Action for a newly uploaded photo should drive the user toward the product's core value: **"Generate Background in GemStudio"** or **"Remove Background"**. By offering "Download" as the main action for raw files, the interface wastes prime screen real estate. The "Download" button only makes sense for ALREADY generated (ready-to-use) assets.

### 9. Critical Feedback Loop Failure During Generation
When a user triggers the image generation process in GemStudio, the active window simply closes, and the progress indicator turns into a tiny icon with a number (e.g., "2") at the bottom of the screen.
* **Problem:** This violates Nielsen's fundamental heuristic: "Visibility of system status". AI image generation takes time. When the window abruptly closes, the user feels confused — they assume the action was canceled or an error occurred. They do not see a progress bar. And when the photos are finally generated, the user **doesn't know where they went** and is forced to search for them throughout the app. Proper UX requires a clear Loading State with image "skeletons" exactly where the results are expected to appear.

### 10. Lack of Curation/Review Step Before Attaching to a Product
As seen on the **Product Details** screen, absolutely all generated photos are automatically attached to the final product, including outright "rejects" (bad background cuts, AI artifacts).
* **Problem:** Instead of a proper "Opt-in" model (where the user curates the results and selects only the 1-2 best variations to save), the system forces an "Opt-out" model. It automatically clutters the listing with everything, forcing the user to open a separate "All Media" modal, select the bad shots, and delete them. If a jeweler needs to process 20-50 items a day, this manual "cleanup" process becomes unbearably tedious and completely destroys the time-saving benefits of AI.

### 11. Scattered Editor Interface (Fragmented Toolbars)
On the **Media Editor** screen, editing tools are scattered across four different zones: top-left (zoom/eraser), top-right (undo/redo/save), a floating panel on the right (crop/adjustments), and a massive bottom panel (Remove BG, GemBrush, etc.).
* **Problem:** This is a severe violation of Fitts's Law and the Law of Proximity in UX. The user constantly has to dart their eyes and mouse cursor across the entire perimeter of the screen. There is illogical grouping (e.g., cropping or erasing tools are duplicated or placed in different corners). All canvas manipulation tools (Crop, Adjust, Brush) should be consolidated into a single inspector panel (e.g., a solid right Sidebar), allowing the user to keep their focus on the image in the center.

---

## 💡 Our Concept (Proposed Solution)

To resolve these issues and turn GemIQ into a daily "staple companion," we propose creating a **New Marketing Asset Generation Flow**.

### Step 1: "Media Library" Organization
We will redesign the Media screen. Instead of a "dump," media will be neatly grouped (e.g., by campaign folders or around a specific base product). There will be a clear visual distinction between **Raw Photos** (inputs) and **Generated Assets** (outputs).

### Step 2: Intent Separation Upon Upload
After uploading a photo, the system will not immediately demand the creation of a "Product". Instead, a choice menu will appear:
* 🛒 **Create Product Listing** (add to inventory/Shopify).
* ✨ **Generate Marketing Assets** (create ad creatives in GemStudio).

### Step 3: Dedicated GemStudio Interface
If the user selects generation, they enter a specialized interface where:
1. The base photo is clearly visible.
2. Ready-made background Presets are offered: "Instagram Story", "Luxury Dark", "On Model".
3. The cost is explicitly stated (e.g., *Generate 4 assets - 1 Credit*). This solves the issue of users forgetting about their free credits or misunderstanding pricing.
