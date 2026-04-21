const readline = require('readline');
const axios = require('axios');
const neonBlue = "\x1b[38;5;45m";    
const deepPurple = "\x1b[38;5;141m";   
const gold = "\x1b[38;5;220m";         
const lightGray = "\x1b[38;5;245m";    
const redAlert = "\x1b[38;5;196m";    
const bold = "\x1b[1m";
const reset = "\x1b[0m";
const line = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function currency(query) {
  return new Promise(resolve => {
    line.question(query, answer => resolve(answer));
  });
}
async function converter() {
  try {
    const apiKey = process.env.api;
    const baseUrl = process.env.url;
    const base = (await currency("Enter the base currency  ")).toUpperCase();
    const target = (await currency("Enter the target currency ")).toUpperCase()
    const amountStr = await currency("Enter the amount: ");
    const amount = parseFloat(amountStr);
    if (isNaN(amount)) {
        console.log("The input is not a number, Please Enter a valid input");
        return;
    }
    const response = await axios.get(baseUrl + apiKey + "/latest/" + base);
    const rates = response.data.conversion_rates;
    const rate = rates[target];
    if (rate) {
      const result = (amount * rate).toFixed(2);
      console.log("\n" + deepPurple + "╔══════════════════════════════════════════╗" + reset);
console.log(deepPurple + "║" + reset + bold + neonBlue + "               XChange RATE               " + reset + deepPurple + "║" + reset);
console.log(deepPurple + "╚══════════════════════════════════════════╝" + reset);
console.log("\n  " + lightGray + amount + " " + base + reset + "  " + neonBlue + "▬▬▶" + reset + "  " + gold + bold + result + " " + target + reset);
console.log("\n  " + lightGray + " LINK: " + reset + neonBlue + "v6.exchangerate-api.com" + reset);
console.log("  " + lightGray + " RATE: " + reset + gold + "1 " + base + " = " + rate + " " + target + reset);
console.log("  " + lightGray + " TIME: " + reset + lightGray + new Date().toLocaleTimeString() + reset);
console.log("\n" + deepPurple + "────────────────────────────────────────────" + reset + "\n");
    } else {
      console.log('Error: Could not find currency code ' ,target);
    }
  } catch (err) {
    console.error("System Error:", err.message);
  } finally {
    line.close();
  }
}
converter();