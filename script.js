/**
 * ==============================================================================
 * College Capstone Mini-Project:
 * Interactive Product Inventory & Analytics Dashboard
 * 
 * CORE JAVASCRIPT CONCEPTS DEMONSTRATED:
 * 1. Data and Input Initialization (Array of objects, prompt(), type casting)
 * 2. Control Flow & Conditional Statements (if...else categorizer, switch statement)
 * 3. Loops and Flow Control (for loop with break and continue demonstrations)
 * 4. Functions & Scope (Regular functions, Arrow functions, Local variable scope)
 * 5. Array Methods & Iteration (forEach(), filter(), map(), reduce())
 * ==============================================================================
 */

// Strict Mode for cleaner code and catching common programming errors
"use strict";

/* ==============================================================================
   SECTION 1: DATA & INPUT INITIALIZATION (Requirement 1)
   - Initial inventory array containing Laptop ($800) and Mouse ($25)
   - Stored as objects in the inventory array
   ============================================================================== */

/**
 * Global Inventory State Array
 * Stores product objects with id, name, and price.
 */
let inventory = [
  { id: 1, name: "Laptop", price: 800 },
  { id: 2, name: "Mouse", price: 25 }
];

// Tracking unique ID sequence for new items
let nextProductId = 3;

// Active category filter state ('all', 'Budget', 'Standard', 'Premium')
let currentCategoryFilter = "all";

// Search query filter state
let currentSearchQuery = "";

/* ==============================================================================
   SECTION 2: CONTROL FLOW & CONDITIONAL STATEMENTS (Requirement 2)
   - if...else for validation and product categorization:
       * Budget: Price < $100
       * Standard: Price between $100 and $500
       * Premium: Price > $500
   - switch statement for analytical reporting menu
   ============================================================================== */

/**
 * Categorizes a product based on price using if...else conditional logic.
 * Demonstrates Arrow Function syntax and if...else branching.
 * 
 * @param {number} price - The unit price of the product
 * @returns {string} - "Budget" | "Standard" | "Premium"
 */
const categorizeProduct = (price) => {
  // Requirement 2: Categorization logic
  if (price < 100) {
    return "Budget";
  } else if (price >= 100 && price <= 500) {
    return "Standard";
  } else {
    // price > 500
    return "Premium";
  }
};

/**
 * Validates product name and price inputs.
 * Demonstrates if...else conditional validation checks.
 * 
 * @param {string} name - Raw product name string
 * @param {any} price - Raw price value
 * @returns {{ isValid: boolean, message: string, cleanName: string, cleanPrice: number }}
 */
function validateProductInput(name, price) {
  // Check if name is provided and not just empty whitespace
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return {
      isValid: false,
      message: "Validation Error: Product name cannot be blank.",
      cleanName: "",
      cleanPrice: 0
    };
  }

  // Type Casting: Convert price into a number using Number()
  const numericPrice = Number(price);

  // Validate that the price is a valid, finite positive number
  if (isNaN(numericPrice)) {
    return {
      isValid: false,
      message: "Validation Error: Price must be a valid numerical value.",
      cleanName: name.trim(),
      cleanPrice: 0
    };
  } else if (numericPrice <= 0) {
    return {
      isValid: false,
      message: "Validation Error: Price must be greater than zero ($0.00).",
      cleanName: name.trim(),
      cleanPrice: 0
    };
  }

  // Inputs are completely valid
  return {
    isValid: true,
    message: "Input is valid.",
    cleanName: name.trim(),
    cleanPrice: numericPrice
  };
}

/**
 * Requirement 2: Generates analytical reports using a switch statement.
 * 
 * @param {string} reportType - The key identifying the requested report
 * @returns {string} - Formatted report text string
 */
function generateReport(reportType) {
  let reportOutput = "";

  // Switch statement implementation for report selection
  switch (reportType) {
    case "formatted-map": {
      // Requirement 5: map() to format items as ["LAPTOP: $800", ...]
      const mappedList = inventory.map(
        (product) => `${product.name.toUpperCase()}: $${product.price}`
      );
      reportOutput = JSON.stringify(mappedList, null, 2);
      break;
    }

    case "affordable-summary": {
      // Requirement 5: filter() items under $200
      const affordable = inventory.filter((item) => item.price < 200);
      reportOutput = `=== AFFORDABLE PRODUCTS (UNDER $200) ===\n`;
      reportOutput += `Found ${affordable.length} affordable product(s):\n\n`;
      affordable.forEach((item, index) => {
        reportOutput += `${index + 1}. ${item.name} — $${item.price.toFixed(2)} (${categorizeProduct(item.price)})\n`;
      });
      break;
    }

    case "premium-summary": {
      const premiumItems = inventory.filter((item) => item.price > 500);
      reportOutput = `=== PREMIUM LUXURY INVENTORY (> $500) ===\n`;
      reportOutput += `Found ${premiumItems.length} premium product(s):\n\n`;
      premiumItems.forEach((item, index) => {
        reportOutput += `${index + 1}. ${item.name} — $${item.price.toFixed(2)}\n`;
      });
      break;
    }

    case "category-breakdown": {
      // Demonstrates aggregation and category counts
      let budgetCount = 0;
      let standardCount = 0;
      let premiumCount = 0;

      for (let i = 0; i < inventory.length; i++) {
        const cat = categorizeProduct(inventory[i].price);
        if (cat === "Budget") budgetCount++;
        else if (cat === "Standard") standardCount++;
        else if (cat === "Premium") premiumCount++;
      }

      const total = inventory.length || 1;
      reportOutput = `=== CATEGORY DISTRIBUTION REPORT ===\n\n`;
      reportOutput += `• Budget (<$100):     ${budgetCount} item(s) [${((budgetCount / total) * 100).toFixed(1)}%]\n`;
      reportOutput += `• Standard ($100-$500): ${standardCount} item(s) [${((standardCount / total) * 100).toFixed(1)}%]\n`;
      reportOutput += `• Premium (>$500):    ${premiumCount} item(s) [${((premiumCount / total) * 100).toFixed(1)}%]\n\n`;
      reportOutput += `Total Catalog Size: ${inventory.length} item(s)`;
      break;
    }

    case "audit-report": {
      const totalValue = calculateTotalValue(inventory);
      reportOutput = `=== INVENTORY AUDIT LOG ===\n`;
      reportOutput += `Timestamp: ${new Date().toLocaleString()}\n`;
      reportOutput += `Total Units: ${inventory.length}\n`;
      reportOutput += `Total Inventory Valuation: $${totalValue.toFixed(2)}\n\n`;
      reportOutput += `Itemized Registry:\n`;
      inventory.forEach((p) => {
        reportOutput += ` - [ID #${p.id}] ${p.name.padEnd(16)} | $${p.price.toFixed(2).padStart(8)} | ${categorizeProduct(p.price)}\n`;
      });
      break;
    }

    default: {
      reportOutput = `Unknown report type "${reportType}". Displaying raw inventory JSON:\n` + JSON.stringify(inventory, null, 2);
      break;
    }
  }

  return reportOutput;
}

/* ==============================================================================
   SECTION 3: LOOPS AND FLOW CONTROL (Requirement 3)
   - Loops to search and process inventory
   - Demonstrating "break" and "continue"
   ============================================================================== */

/**
 * Searches the inventory using a standard loop while demonstrating
 * the practical usage of 'break' and 'continue' keywords.
 * 
 * Flow Control Logic:
 * - 'continue': Skips products whose name does not match the search term.
 * - 'break': Halts loop execution immediately once the target is found.
 * 
 * @param {string} targetName - Name or substring to locate
 * @returns {{ match: object|null, logs: string[] }}
 */
function searchProductWithLoopDemo(targetName) {
  const logs = [];
  const query = targetName.trim().toLowerCase();
  let foundProduct = null;

  logs.push(`Initiating loop search for: "${targetName}" (Total items: ${inventory.length})`);

  // Using a standard 'for' loop to iterate through inventory items
  for (let i = 0; i < inventory.length; i++) {
    const currentItem = inventory[i];
    const itemNameLower = currentItem.name.toLowerCase();

    logs.push(`[Iteration ${i + 1}] Evaluating item: "${currentItem.name}" ($${currentItem.price})`);

    // Demonstrating 'continue': Skip this iteration if item doesn't match
    if (!itemNameLower.includes(query)) {
      logs.push(`  → No match. Executing 'continue' to skip to next item.`);
      continue;
    }

    // Target product matched!
    foundProduct = currentItem;
    logs.push(`  ✓ Match found: "${currentItem.name}" ($${currentItem.price})`);
    logs.push(`  → Executing 'break' to terminate the loop early!`);

    // Demonstrating 'break': Stop looping immediately once found
    break;
  }

  if (foundProduct) {
    logs.push(`Search completed successfully. Found product: "${foundProduct.name}".`);
  } else {
    logs.push(`Search completed. No matching product found in inventory.`);
  }

  return { match: foundProduct, logs: logs };
}

/**
 * Regular search function returning all matching products.
 * Demonstrates loop processing over inventory items.
 * 
 * @param {string} query - Product name search query
 * @returns {Array<object>} - Array of matching products
 */
function searchProducts(query) {
  if (!query || query.trim() === "") {
    return inventory;
  }

  const cleanQuery = query.trim().toLowerCase();
  const results = [];

  // Demonstrates loop processing with conditional filtering
  for (let i = 0; i < inventory.length; i++) {
    const item = inventory[i];
    if (item.name.toLowerCase().includes(cleanQuery)) {
      results.push(item);
    }
  }

  return results;
}

/* ==============================================================================
   SECTION 4: FUNCTIONS & LOCAL SCOPE (Requirement 4)
   - Regular functions for adding products, calculating value, searching, reports
   - Arrow functions for helpers and callbacks
   - Demonstrating local variable scope in tax/discount calculations
   ============================================================================== */

/**
 * Regular function to add a new product to the inventory array.
 * Converts price, validates inputs, and triggers dashboard updates.
 * 
 * @param {string} rawName - Product name
 * @param {number|string} rawPrice - Product price
 * @returns {boolean} - Success flag
 */
function addProduct(rawName, rawPrice) {
  // Validate input using our conditional helper
  const validation = validateProductInput(rawName, rawPrice);

  if (!validation.isValid) {
    showToast(validation.message, "error");
    return false;
  }

  // Create new product object
  const newProduct = {
    id: nextProductId++,
    name: validation.cleanName,
    price: validation.cleanPrice
  };

  // Add object to global inventory array
  inventory.push(newProduct);

  // Update UI and show success feedback
  updateDashboard();
  showToast(`Added "${newProduct.name}" ($${newProduct.price.toFixed(2)}) — ${categorizeProduct(newProduct.price)}`, "success");

  return true;
}

/**
 * Requirement 1: Native prompt() dialog handler.
 * Prompts user for product name and price, parses and validates inputs.
 */
function addProductViaPrompt() {
  // Step 1: Prompt user for product name
  const nameInput = window.prompt("Enter new product name (e.g. Monitor, Keyboard):");

  // If user clicked 'Cancel' on the prompt
  if (nameInput === null) {
    showToast("Product addition cancelled.", "info");
    return;
  }

  if (nameInput.trim() === "") {
    showToast("Validation Error: Product name cannot be blank.", "error");
    return;
  }

  // Step 2: Prompt user for product price
  const priceInput = window.prompt(`Enter price for "${nameInput.trim()}" in USD ($):`);

  if (priceInput === null) {
    showToast("Product addition cancelled.", "info");
    return;
  }

  // Convert string input to number
  const numericPrice = Number(priceInput);

  // Validate numerical input
  if (isNaN(numericPrice) || numericPrice <= 0) {
    showToast("Validation Error: Please enter a valid positive numerical price.", "error");
    return;
  }

  // Add validated product
  addProduct(nameInput, numericPrice);
}

/**
 * Calculates total inventory valuation using a loop.
 * Demonstrates regular function definition and local scope.
 * 
 * @param {Array<object>} items - List of inventory items
 * @returns {number} - Total dollar value
 */
function calculateTotalValue(items) {
  // Local variable scope: 'totalValue' exists ONLY inside this function!
  let totalValue = 0;

  for (let i = 0; i < items.length; i++) {
    totalValue += items[i].price;
  }

  return totalValue;
}

/**
 * Calculates financial tax and discount values.
 * DEMONSTRATION OF LOCAL SCOPE:
 * The variables 'discountAmount', 'subtotalAfterDiscount', 'taxAmount',
 * and 'finalNetTotal' are declared locally with 'let' and are inaccessible
 * outside this function.
 * 
 * @param {number} subtotal - Raw inventory subtotal
 * @param {number} taxRatePercent - Tax percentage (e.g. 8)
 * @param {number} discountRatePercent - Discount percentage (e.g. 10)
 * @returns {object} - Breakdown object with local calculation results
 */
function calculateTaxAndDiscount(subtotal, taxRatePercent, discountRatePercent) {
  // --- LOCAL SCOPE DEMONSTRATION START ---
  const discountAmount = subtotal * (discountRatePercent / 100);
  const subtotalAfterDiscount = subtotal - discountAmount;
  const taxAmount = subtotalAfterDiscount * (taxRatePercent / 100);
  const finalNetTotal = subtotalAfterDiscount + taxAmount;
  // --- LOCAL SCOPE DEMONSTRATION END ---

  return {
    subtotal: subtotal,
    discountRate: discountRatePercent,
    discountAmount: discountAmount,
    subtotalAfterDiscount: subtotalAfterDiscount,
    taxRate: taxRatePercent,
    taxAmount: taxAmount,
    finalNetTotal: finalNetTotal
  };
}

/**
 * Removes a product from the inventory by its ID.
 * 
 * @param {number} id - Product identifier
 */
function deleteProductById(id) {
  const index = inventory.findIndex((item) => item.id === id);
  if (index !== -1) {
    const removedItem = inventory.splice(index, 1)[0];
    updateDashboard();
    showToast(`Removed "${removedItem.name}" from inventory.`, "info");
  }
}

/**
 * Resets inventory back to original baseline requirements:
 * Laptop ($800) and Mouse ($25).
 */
function resetInventoryToDefault() {
  inventory = [
    { id: 1, name: "Laptop", price: 800 },
    { id: 2, name: "Mouse", price: 25 }
  ];
  nextProductId = 3;
  currentCategoryFilter = "all";
  currentSearchQuery = "";

  // Reset filter UI tabs
  document.querySelectorAll(".filter-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.filter === "all");
  });

  const searchInput = document.getElementById("input-search-query");
  if (searchInput) searchInput.value = "";

  updateDashboard();
  showToast("Inventory successfully restored to initial baseline!", "success");
}

/* ==============================================================================
   SECTION 5: ARRAY METHODS & ITERATION (Requirement 5)
   - forEach() to display inventory items and categories in the table
   - filter() to find products costing less than $200 (Affordable products)
   - map() to generate formatted reports ["LAPTOP: $800", ...]
   ============================================================================== */

/**
 * Renders the inventory table rows using Array.prototype.forEach().
 * Demonstrates forEach iteration over data objects.
 * 
 * @param {Array<object>} items - Filtered list of products to display
 */
function renderInventoryTable(items) {
  const tbody = document.getElementById("inventory-table-body");
  const emptyState = document.getElementById("table-empty-state");
  const countBadge = document.getElementById("table-items-badge");

  if (!tbody) return;

  // Clear existing table content
  tbody.innerHTML = "";

  if (items.length === 0) {
    emptyState.style.display = "block";
    countBadge.textContent = "0 items";
    return;
  }

  emptyState.style.display = "none";
  countBadge.textContent = `${items.length} item${items.length === 1 ? "" : "s"}`;

  // Requirement 5: Using forEach() to iterate through inventory items
  items.forEach((product, index) => {
    const tr = document.createElement("tr");

    // Compute category using if...else logic
    const category = categorizeProduct(product.price);

    // Assign appropriate badge class
    let categoryBadgeClass = "badge-cat-standard";
    if (category === "Budget") categoryBadgeClass = "badge-cat-budget";
    else if (category === "Premium") categoryBadgeClass = "badge-cat-premium";

    tr.innerHTML = `
      <td class="table-idx">${index + 1}</td>
      <td class="product-cell-name">${escapeHTML(product.name)}</td>
      <td><span class="price-tag">$${product.price.toFixed(2)}</span></td>
      <td><span class="badge-category ${categoryBadgeClass}">${category}</span></td>
      <td style="text-align: center;">
        <button class="btn-delete-row" data-id="${product.id}" title="Delete ${escapeHTML(product.name)}" aria-label="Delete ${escapeHTML(product.name)}">
          <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  // Attach delete button listeners to newly generated rows
  tbody.querySelectorAll(".btn-delete-row").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = Number(e.currentTarget.dataset.id);
      deleteProductById(id);
    });
  });
}

/**
 * Requirement 5: Renders the Affordable Products segment (< $200)
 * Uses Array.prototype.filter() to find affordable products.
 */
function renderAffordableProducts() {
  const container = document.getElementById("affordable-products-list");
  if (!container) return;

  // Requirement 5: filter() to find products costing less than $200
  const affordableItems = inventory.filter((item) => item.price < 200);

  container.innerHTML = "";

  if (affordableItems.length === 0) {
    container.innerHTML = `
      <p style="color: var(--text-muted); font-size: 0.88rem; grid-column: 1 / -1; padding: 0.5rem 0;">
        No products currently cost under $200.
      </p>
    `;
    return;
  }

  // Render cards for each affordable product
  affordableItems.forEach((product) => {
    const card = document.createElement("div");
    card.className = "affordable-card";
    card.innerHTML = `
      <div class="aff-info">
        <span class="aff-name">${escapeHTML(product.name)}</span>
        <span class="aff-category">${categorizeProduct(product.price)} &bull; &lt; $200</span>
      </div>
      <div class="aff-price">$${product.price.toFixed(2)}</div>
    `;
    container.appendChild(card);
  });
}

/**
 * Requirement 5: Generates and updates the formatted report output
 * Uses Array.prototype.map() to create formatted strings.
 */
function renderAnalyticsReport() {
  const selectElem = document.getElementById("select-report-type");
  const codeElem = document.getElementById("report-output-code");
  const badgeElem = document.getElementById("report-type-badge");

  if (!codeElem) return;

  const selectedType = selectElem ? selectElem.value : "formatted-map";
  
  if (badgeElem && selectElem) {
    badgeElem.textContent = `Mode: ${selectElem.options[selectElem.selectedIndex].text}`;
  }

  // Execute report generation via switch statement
  const resultText = generateReport(selectedType);
  codeElem.textContent = resultText;
}

/**
 * Updates all top-level KPI metric cards and financial calculations.
 */
function updateMetricsAndCalculators() {
  const totalValueElem = document.getElementById("total-inventory-value");
  const totalCountElem = document.getElementById("total-products-count");
  const budgetCountElem = document.getElementById("count-budget");
  const stdPremCountElem = document.getElementById("count-standard-premium");

  // Calculate total inventory value via regular function
  const totalVal = calculateTotalValue(inventory);
  const totalCount = inventory.length;

  // Category counts using arrow function helper
  let budgetCount = 0;
  let standardCount = 0;
  let premiumCount = 0;

  inventory.forEach((item) => {
    const cat = categorizeProduct(item.price);
    if (cat === "Budget") budgetCount++;
    else if (cat === "Standard") standardCount++;
    else if (cat === "Premium") premiumCount++;
  });

  if (totalValueElem) totalValueElem.textContent = `$${totalVal.toFixed(2)}`;
  if (totalCountElem) totalCountElem.textContent = totalCount.toString();
  if (budgetCountElem) budgetCountElem.textContent = budgetCount.toString();
  if (stdPremCountElem) stdPremCountElem.textContent = `${standardCount} / ${premiumCount}`;

  // Update Tax and Discount Financial Calculator
  const taxInput = document.getElementById("input-tax-rate");
  const discountInput = document.getElementById("input-discount-rate");
  const taxValLabel = document.getElementById("tax-rate-val");
  const discountValLabel = document.getElementById("discount-rate-val");

  const taxRate = taxInput ? parseFloat(taxInput.value) : 8;
  const discountRate = discountInput ? parseFloat(discountInput.value) : 0;

  if (taxValLabel) taxValLabel.textContent = `${taxRate.toFixed(1)}%`;
  if (discountValLabel) discountValLabel.textContent = `${discountRate}%`;

  // Perform calculation with local variables
  const calc = calculateTaxAndDiscount(totalVal, taxRate, discountRate);

  const subtotalElem = document.getElementById("calc-subtotal");
  const discountElem = document.getElementById("calc-discount");
  const taxElem = document.getElementById("calc-tax");
  const netTotalElem = document.getElementById("calc-net-total");

  if (subtotalElem) subtotalElem.textContent = `$${calc.subtotal.toFixed(2)}`;
  if (discountElem) discountElem.textContent = `-$${calc.discountAmount.toFixed(2)}`;
  if (taxElem) taxElem.textContent = `+$${calc.taxAmount.toFixed(2)}`;
  if (netTotalElem) netTotalElem.textContent = `$${calc.finalNetTotal.toFixed(2)}`;
}

/**
 * Master update function called whenever state changes.
 */
function updateDashboard() {
  // 1. Filter items based on active category tab and search query
  let filtered = inventory;

  if (currentCategoryFilter !== "all") {
    filtered = filtered.filter(item => categorizeProduct(item.price) === currentCategoryFilter);
  }

  if (currentSearchQuery.trim() !== "") {
    const query = currentSearchQuery.trim().toLowerCase();
    filtered = filtered.filter(item => item.name.toLowerCase().includes(query));
  }

  // 2. Render UI Components
  renderInventoryTable(filtered);
  renderAffordableProducts();
  renderAnalyticsReport();
  updateMetricsAndCalculators();
}

/* ==============================================================================
   SECTION 6: UI HELPERS & EVENT LISTENERS
   ============================================================================== */

/**
 * Escapes HTML characters to prevent XSS.
 * 
 * @param {string} str - Raw string
 * @returns {string} - Safe escaped HTML string
 */
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Displays user feedback notifications (Toasts).
 * 
 * @param {string} message - Message text
 * @param {"success"|"error"|"info"|"warning"} type - Toast style type
 */
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  let iconSVG = `
    <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  `;

  if (type === "success") {
    iconSVG = `
      <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    `;
  } else if (type === "error") {
    iconSVG = `
      <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
    `;
  }

  toast.innerHTML = `${iconSVG}<span>${escapeHTML(message)}</span>`;
  container.appendChild(toast);

  // Auto remove toast after 3.8 seconds
  setTimeout(() => {
    toast.classList.add("toast-hide");
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 250);
  }, 3800);
}

/**
 * DOM Ready Event Initialization
 */
document.addEventListener("DOMContentLoaded", () => {
  // Initial dashboard render
  updateDashboard();

  // 1. Form Submission Handler for Add Product
  const formAddProduct = document.getElementById("form-add-product");
  const inputName = document.getElementById("input-product-name");
  const inputPrice = document.getElementById("input-product-price");
  const previewBadge = document.getElementById("badge-category-preview");
  const feedbackName = document.getElementById("feedback-name");
  const feedbackPrice = document.getElementById("feedback-price");

  // Live Category Preview as price is typed
  if (inputPrice && previewBadge) {
    inputPrice.addEventListener("input", (e) => {
      const val = parseFloat(e.target.value);
      if (!isNaN(val) && val > 0) {
        const cat = categorizeProduct(val);
        previewBadge.textContent = cat;
        previewBadge.className = "badge";
        if (cat === "Budget") previewBadge.classList.add("badge-emerald");
        else if (cat === "Standard") previewBadge.classList.add("badge-primary");
        else previewBadge.classList.add("badge-gold");
      } else {
        previewBadge.textContent = "Enter price";
        previewBadge.className = "badge badge-secondary";
      }
    });
  }

  if (formAddProduct) {
    formAddProduct.addEventListener("submit", (e) => {
      e.preventDefault();

      // Clear previous inline errors
      feedbackName.textContent = "";
      feedbackPrice.textContent = "";
      inputName.classList.remove("is-invalid");
      inputPrice.classList.remove("is-invalid");

      const rawName = inputName.value;
      const rawPrice = inputPrice.value;

      // Validation
      const validation = validateProductInput(rawName, rawPrice);

      if (!validation.isValid) {
        if (!rawName.trim()) {
          inputName.classList.add("is-invalid");
          feedbackName.textContent = "Product name is required.";
        }
        if (!rawPrice || isNaN(Number(rawPrice)) || Number(rawPrice) <= 0) {
          inputPrice.classList.add("is-invalid");
          feedbackPrice.textContent = "Valid positive price is required.";
        }
        showToast(validation.message, "error");
        return;
      }

      // Add to inventory
      const added = addProduct(validation.cleanName, validation.cleanPrice);
      if (added) {
        formAddProduct.reset();
        previewBadge.textContent = "Enter price";
        previewBadge.className = "badge badge-secondary";
        inputName.focus();
      }
    });
  }

  // 2. Add Product via prompt() Button Handler (Requirement 1)
  const btnAddPrompt = document.getElementById("btn-add-via-prompt");
  if (btnAddPrompt) {
    btnAddPrompt.addEventListener("click", () => {
      addProductViaPrompt();
    });
  }

  // 3. Category Filter Tabs
  const filterTabs = document.querySelectorAll(".filter-tab");
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      filterTabs.forEach(t => t.classList.remove("active"));
      e.currentTarget.classList.add("active");
      currentCategoryFilter = e.currentTarget.dataset.filter;
      updateDashboard();
    });
  });

  // 4. Real-time Search Input
  const searchInput = document.getElementById("input-search-query");
  const btnClearSearch = document.getElementById("btn-clear-search");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearchQuery = e.target.value;
      updateDashboard();
    });
  }

  if (btnClearSearch && searchInput) {
    btnClearSearch.addEventListener("click", () => {
      searchInput.value = "";
      currentSearchQuery = "";
      updateDashboard();
      searchInput.focus();
    });
  }

  // 5. Interactive Loop Trace (break / continue demonstration)
  const btnRunLoopDemo = document.getElementById("btn-run-loop-demo");
  const traceBox = document.getElementById("loop-trace-container");
  const traceOutput = document.getElementById("loop-trace-output");
  const btnCloseTrace = document.getElementById("btn-close-trace");

  if (btnRunLoopDemo && traceBox && traceOutput) {
    btnRunLoopDemo.addEventListener("click", () => {
      const query = (searchInput && searchInput.value.trim()) || "Mouse";
      const traceResult = searchProductWithLoopDemo(query);

      traceBox.style.display = "block";
      traceOutput.innerHTML = "";

      traceResult.logs.forEach((log) => {
        const div = document.createElement("div");
        div.className = "trace-entry";
        if (log.includes("'continue'")) {
          div.className += " trace-continue";
        } else if (log.includes("'break'")) {
          div.className += " trace-break";
        } else if (log.includes("completed")) {
          div.className += " trace-complete";
        }
        div.textContent = log;
        traceOutput.appendChild(div);
      });

      traceOutput.scrollTop = traceOutput.scrollHeight;
      showToast(`Loop trace executed for query: "${query}"`, "info");
    });
  }

  if (btnCloseTrace && traceBox) {
    btnCloseTrace.addEventListener("click", () => {
      traceBox.style.display = "none";
    });
  }

  // 6. Tax and Discount Sliders
  const taxInput = document.getElementById("input-tax-rate");
  const discountInput = document.getElementById("input-discount-rate");

  if (taxInput) {
    taxInput.addEventListener("input", () => {
      updateMetricsAndCalculators();
    });
  }

  if (discountInput) {
    discountInput.addEventListener("input", () => {
      updateMetricsAndCalculators();
    });
  }

  // 7. Report Selection (switch statement trigger)
  const reportSelect = document.getElementById("select-report-type");
  const btnGenerateReport = document.getElementById("btn-generate-report");
  const btnCopyReport = document.getElementById("btn-copy-report");

  if (reportSelect) {
    reportSelect.addEventListener("change", () => {
      renderAnalyticsReport();
    });
  }

  if (btnGenerateReport) {
    btnGenerateReport.addEventListener("click", () => {
      renderAnalyticsReport();
      showToast("Report compiled successfully via switch statement!", "info");
    });
  }

  if (btnCopyReport) {
    btnCopyReport.addEventListener("click", () => {
      const codeElem = document.getElementById("report-output-code");
      if (codeElem) {
        navigator.clipboard.writeText(codeElem.textContent).then(() => {
          showToast("Report output copied to clipboard!", "success");
        }).catch(() => {
          showToast("Failed to copy to clipboard.", "error");
        });
      }
    });
  }

  // 8. Reset Inventory Modal / Dialog
  const btnReset = document.getElementById("btn-reset-inventory");
  const resetModal = document.getElementById("modal-reset-confirm");
  const btnCancelReset = document.getElementById("btn-dialog-cancel");
  const btnConfirmReset = document.getElementById("btn-dialog-confirm");

  if (btnReset && resetModal) {
    btnReset.addEventListener("click", () => {
      if (typeof resetModal.showModal === "function") {
        resetModal.showModal();
      } else {
        // Fallback for browsers that don't support <dialog>
        if (confirm("Reset inventory to initial state (Laptop $800, Mouse $25)?")) {
          resetInventoryToDefault();
        }
      }
    });
  }

  if (btnCancelReset && resetModal) {
    btnCancelReset.addEventListener("click", () => {
      resetModal.close();
    });
  }

  if (btnConfirmReset && resetModal) {
    btnConfirmReset.addEventListener("click", () => {
      resetModal.close();
      resetInventoryToDefault();
    });
  }

  // Empty state button
  const btnEmptyReset = document.getElementById("btn-empty-reset");
  if (btnEmptyReset) {
    btnEmptyReset.addEventListener("click", () => {
      inputName.focus();
    });
  }
});
