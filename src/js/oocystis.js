/* *****************************************************************************
* File: oocystis.js
*
* Copyright (c) 2016 Tamas Kiss
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
* *************************************************************************** */

// Object to store data
var data = {};

var year = (new Date()).getFullYear();

function closeLicenseClick() {
  $("#license").fadeOut(function() {
    $("#quickStart").removeClass("hidden");
  });
}

function closeQuickStartClick() {
  $("#quickStart").fadeOut();
}

function editRow(name) {
  for(var i = 1; i <= 5; i++) {
    $("span[data='" + name + i + "']").addClass("hidden");
    $("input[data='" + name + i + "']").removeClass("hidden");
  }
}

function doneRow(name) {
  for(var i = 1; i <= 5; i++) {
    $("span[data='" + name + i + "']").removeClass("hidden");
    $("input[data='" + name + i + "']").addClass("hidden");
  }
}

function editBalanceSheet() {
  // Edit, Done, Check buttons
  $("#editBalanceSheet").addClass("hidden");
  $("#doneBalanceSheet").removeClass("hidden");
  $("#checkBalanceSheet").addClass("hidden");
  $("#checkIncomeStatement").addClass("hidden");

  $("#editIncomeStatement").attr("disabled", true);

  // Assets
  editRow("marketableSecurities");
  editRow("accountsReceivable");
  editRow("inventories");
  editRow("otherCurrentAssets");

  editRow("propertyPlantAndEquipment");
  editRow("longTermInvestments");
  editRow("goodwill");
  editRow("intangibleAssets");
  editRow("otherAssets");

  // Liabilities
  editRow("debtDueForRepayment");
  editRow("accountsPayable");
  editRow("otherCurrentLiabilities");
  editRow("longTermDebt");

  // Shareholders' equity
  editRow("commonStockAndOtherPaidInCapital");
}

function doneBalanceSheet() {
  // Edit, Done, Check buttons
  $("#editBalanceSheet").removeClass("hidden");
  $("#doneBalanceSheet").addClass("hidden");
  $("#checkBalanceSheet").removeClass("hidden");
  $("#checkIncomeStatement").removeClass("hidden");

  $("#editIncomeStatement").attr("disabled", false);

  // Assets
  doneRow("marketableSecurities");
  doneRow("accountsReceivable");
  doneRow("inventories");
  doneRow("otherCurrentAssets");

  doneRow("propertyPlantAndEquipment");
  doneRow("longTermInvestments");
  doneRow("goodwill");
  doneRow("intangibleAssets");
  doneRow("otherAssets");

  // Liabilities
  doneRow("debtDueForRepayment");
  doneRow("accountsPayable");
  doneRow("otherCurrentLiabilities");
  doneRow("longTermDebt");

  // Shareholders' equity
  doneRow("commonStockAndOtherPaidInCapital");
}

function editIncomeStatement() {
  // Edit, Done, Check buttons
  $("#editIncomeStatement").addClass("hidden");
  $("#doneIncomeStatement").removeClass("hidden");
  $("#checkBalanceSheet").addClass("hidden");
  $("#checkIncomeStatement").addClass("hidden");

  $("#editBalanceSheet").attr("disabled", true);

  // Income statement
  editRow("netSales");
  editRow("costOfGoodsSold");
  editRow("sellingGeneralAndOtherExpenses");
  editRow("researchAndDevelopment");
  editRow("otherOperatingExpenses");
  editRow("extraordinaryItems");
  editRow("otherItems");
  editRow("dividends");
}

function doneIncomeStatement() {
  // Edit, Done, Check buttons
  $("#editIncomeStatement").removeClass("hidden");
  $("#doneIncomeStatement").addClass("hidden");
  $("#checkBalanceSheet").removeClass("hidden");
  $("#checkIncomeStatement").removeClass("hidden");

  $("#editBalanceSheet").attr("disabled", false);

  // Income statement
  doneRow("netSales");
  doneRow("costOfGoodsSold");
  doneRow("sellingGeneralAndOtherExpenses");
  doneRow("researchAndDevelopment");
  doneRow("otherOperatingExpenses");
  doneRow("extraordinaryItems");
  doneRow("otherItems");
  doneRow("dividends");
}

function bindInput() {
  $("input[data]").each(function() {
    var value = parseInt($(this).val());
    data[$(this).attr("data")] = ($.isNumeric(value) ? value : 0);
  });
}

function bindInputInverse() {
  $("input[data]").each(function() {
    var value = data[$(this).attr("data")];
    $(this).val($.isNumeric(value) ? value : 0);
  });
}

function bindOutput() {
  $("span[data], strong[data]").each(function() {
    var value = data[$(this).attr("data")];
    $(this).text($.isNumeric(value) ? value : 0);
  });
}

function validate() {
  $("#error6").addClass("hidden");
  $(".e6").removeClass("highlight");

  if(data["depriciationAmortization"] < 0 || data["depriciationAmortization"] > 100 ||
      data["interestOnShortTermDebt"] < 0 || data["interestOnShortTermDebt"] > 100 ||
      data["interestOnLongTermDebt"] < 0 || data["interestOnLongTermDebt"] > 100 ||
      data["taxRate"] < 0 || data["taxRate"] > 100 ||
      data["discountRate"] < 0 || data["discountRate"] > 100) {
        $("#error6").fadeIn();
        $("#error6").removeClass("hidden");
        $(".e6").addClass("highlight");
      }
}

function calculateBalanceSheet() {
  // Depriciation/amortization
  var depriciationAmortization1 = data["depriciationAmortization"] / 100 * data["propertyPlantAndEquipment1"];
  data["depriciationAmortization1"] = Math.min(depriciationAmortization1, data["propertyPlantAndEquipment1"]);
  data["accumulatedDepriciationAmortization1"] = -data["depriciationAmortization1"];

  var depriciationAmortization2 = data["depriciationAmortization"] / 100 * data["propertyPlantAndEquipment2"];
  data["depriciationAmortization2"] = Math.min(depriciationAmortization2, data["propertyPlantAndEquipment2"] + data["accumulatedDepriciationAmortization1"]);
  data["accumulatedDepriciationAmortization2"] = data["accumulatedDepriciationAmortization1"] - data["depriciationAmortization2"];

  var depriciationAmortization3 = data["depriciationAmortization"] / 100 * data["propertyPlantAndEquipment3"];
  data["depriciationAmortization3"] = Math.min(depriciationAmortization3, data["propertyPlantAndEquipment3"] + data["accumulatedDepriciationAmortization2"]);
  data["accumulatedDepriciationAmortization3"] = data["accumulatedDepriciationAmortization2"] - data["depriciationAmortization3"];

  var depriciationAmortization4 = data["depriciationAmortization"] / 100 * data["propertyPlantAndEquipment4"];
  data["depriciationAmortization4"] = Math.min(depriciationAmortization4, data["propertyPlantAndEquipment4"] + data["accumulatedDepriciationAmortization3"]);
  data["accumulatedDepriciationAmortization4"] = data["accumulatedDepriciationAmortization3"] - data["depriciationAmortization4"];

  var depriciationAmortization5 = data["depriciationAmortization"] / 100 * data["propertyPlantAndEquipment5"];
  data["depriciationAmortization5"] = Math.min(depriciationAmortization5, data["propertyPlantAndEquipment5"] + data["accumulatedDepriciationAmortization4"]);
  data["accumulatedDepriciationAmortization5"] = data["accumulatedDepriciationAmortization4"] - data["depriciationAmortization5"];

  // Total Current Liabilities
  data["totalCurrentLiabilities1"] = data["debtDueForRepayment1"] + data["accountsPayable1"] + data["otherCurrentLiabilities1"];
  data["totalCurrentLiabilities2"] = data["debtDueForRepayment2"] + data["accountsPayable2"] + data["otherCurrentLiabilities2"];
  data["totalCurrentLiabilities3"] = data["debtDueForRepayment3"] + data["accountsPayable3"] + data["otherCurrentLiabilities3"];
  data["totalCurrentLiabilities4"] = data["debtDueForRepayment4"] + data["accountsPayable4"] + data["otherCurrentLiabilities4"];
  data["totalCurrentLiabilities5"] = data["debtDueForRepayment5"] + data["accountsPayable5"] + data["otherCurrentLiabilities5"];

  // Total Liabilities
  data["totalLiabilities1"] = data["totalCurrentLiabilities1"] + data["longTermDebt1"];
  data["totalLiabilities2"] = data["totalCurrentLiabilities2"] + data["longTermDebt2"];
  data["totalLiabilities3"] = data["totalCurrentLiabilities3"] + data["longTermDebt3"];
  data["totalLiabilities4"] = data["totalCurrentLiabilities4"] + data["longTermDebt4"];
  data["totalLiabilities5"] = data["totalCurrentLiabilities5"] + data["longTermDebt5"];
}

function calculateIncomeStatement() {
  // Gross profit
  data["grossProfit1"] = data["netSales1"] - data["costOfGoodsSold1"];
  data["grossProfit2"] = data["netSales2"] - data["costOfGoodsSold2"];
  data["grossProfit3"] = data["netSales3"] - data["costOfGoodsSold3"];
  data["grossProfit4"] = data["netSales4"] - data["costOfGoodsSold4"];
  data["grossProfit5"] = data["netSales5"] - data["costOfGoodsSold5"];

  // Total Operating Expenses
  data["totalOperatingExpenses1"] = data["sellingGeneralAndOtherExpenses1"] + data["researchAndDevelopment1"] + data["depriciationAmortization1"] + data["otherOperatingExpenses1"];
  data["totalOperatingExpenses2"] = data["sellingGeneralAndOtherExpenses2"] + data["researchAndDevelopment2"] + data["depriciationAmortization2"] + data["otherOperatingExpenses2"];
  data["totalOperatingExpenses3"] = data["sellingGeneralAndOtherExpenses3"] + data["researchAndDevelopment3"] + data["depriciationAmortization3"] + data["otherOperatingExpenses3"];
  data["totalOperatingExpenses4"] = data["sellingGeneralAndOtherExpenses4"] + data["researchAndDevelopment4"] + data["depriciationAmortization4"] + data["otherOperatingExpenses4"];
  data["totalOperatingExpenses5"] = data["sellingGeneralAndOtherExpenses5"] + data["researchAndDevelopment5"] + data["depriciationAmortization5"] + data["otherOperatingExpenses5"];

  // Operating Income
  data["operatingIncome1"] = data["grossProfit1"] - data["totalOperatingExpenses1"];
  data["operatingIncome2"] = data["grossProfit2"] - data["totalOperatingExpenses2"];
  data["operatingIncome3"] = data["grossProfit3"] - data["totalOperatingExpenses3"];
  data["operatingIncome4"] = data["grossProfit4"] - data["totalOperatingExpenses4"];
  data["operatingIncome5"] = data["grossProfit5"] - data["totalOperatingExpenses5"];

  // Earnings Before Interest and taxes
  data["earningsBeforeIncomeAndTaxes1"] = data["operatingIncome1"] - (data["extraordinaryItems1"] + data["otherItems1"]);
  data["earningsBeforeIncomeAndTaxes2"] = data["operatingIncome2"] - (data["extraordinaryItems2"] + data["otherItems2"]);
  data["earningsBeforeIncomeAndTaxes3"] = data["operatingIncome3"] - (data["extraordinaryItems3"] + data["otherItems3"]);
  data["earningsBeforeIncomeAndTaxes4"] = data["operatingIncome4"] - (data["extraordinaryItems4"] + data["otherItems4"]);
  data["earningsBeforeIncomeAndTaxes5"] = data["operatingIncome5"] - (data["extraordinaryItems5"] + data["otherItems5"]);

  // Interest Expenses
  data["interestExpense1"] = data["interestOnShortTermDebt"] / 100 * data["debtDueForRepayment1"] + data["interestOnLongTermDebt"] / 100 * data["longTermDebt1"];
  data["interestExpense2"] = data["interestOnShortTermDebt"] / 100 * data["debtDueForRepayment2"] + data["interestOnLongTermDebt"] / 100 * data["longTermDebt2"];
  data["interestExpense3"] = data["interestOnShortTermDebt"] / 100 * data["debtDueForRepayment3"] + data["interestOnLongTermDebt"] / 100 * data["longTermDebt3"];
  data["interestExpense4"] = data["interestOnShortTermDebt"] / 100 * data["debtDueForRepayment4"] + data["interestOnLongTermDebt"] / 100 * data["longTermDebt4"];
  data["interestExpense5"] = data["interestOnShortTermDebt"] / 100 * data["debtDueForRepayment5"] + data["interestOnLongTermDebt"] / 100 * data["longTermDebt5"];

  // Taxable Income
  data["taxableIncome1"] = data["earningsBeforeIncomeAndTaxes1"] - data["interestExpense1"];
  data["taxableIncome2"] = data["earningsBeforeIncomeAndTaxes2"] - data["interestExpense2"];
  data["taxableIncome3"] = data["earningsBeforeIncomeAndTaxes3"] - data["interestExpense3"];
  data["taxableIncome4"] = data["earningsBeforeIncomeAndTaxes4"] - data["interestExpense4"];
  data["taxableIncome5"] = data["earningsBeforeIncomeAndTaxes5"] - data["interestExpense5"];

  // Tax
  data["tax1"] = data["taxableIncome1"] > 0 ? data["taxRate"] / 100 * data["taxableIncome1"] : 0;
  data["tax2"] = data["taxableIncome2"] > 0 ? data["taxRate"] / 100 * data["taxableIncome2"] : 0;
  data["tax3"] = data["taxableIncome3"] > 0 ? data["taxRate"] / 100 * data["taxableIncome3"] : 0;
  data["tax4"] = data["taxableIncome4"] > 0 ? data["taxRate"] / 100 * data["taxableIncome4"] : 0;
  data["tax5"] = data["taxableIncome5"] > 0 ? data["taxRate"] / 100 * data["taxableIncome5"] : 0;

  // Net Income
  data["netIncome1"] = data["taxableIncome1"] - data["tax1"];
  data["netIncome2"] = data["taxableIncome2"] - data["tax2"];
  data["netIncome3"] = data["taxableIncome3"] - data["tax3"];
  data["netIncome4"] = data["taxableIncome4"] - data["tax4"];
  data["netIncome5"] = data["taxableIncome5"] - data["tax5"];

  // Addition to retained earnings
  data["additionToRetainedEarnings1"] = data["netIncome1"] - data["dividends1"];
  data["additionToRetainedEarnings2"] = data["netIncome2"] - data["dividends2"];
  data["additionToRetainedEarnings3"] = data["netIncome3"] - data["dividends3"];
  data["additionToRetainedEarnings4"] = data["netIncome4"] - data["dividends4"];
  data["additionToRetainedEarnings5"] = data["netIncome5"] - data["dividends5"];

  // Retained earnings (this can be calculated only after Addition to retained earnings is available)
  data["retainedEarnings1"] = data["additionToRetainedEarnings1"];
  data["retainedEarnings2"] = data["retainedEarnings1"] + data["additionToRetainedEarnings2"];
  data["retainedEarnings3"] = data["retainedEarnings2"] + data["additionToRetainedEarnings3"];
  data["retainedEarnings4"] = data["retainedEarnings3"] + data["additionToRetainedEarnings4"];
  data["retainedEarnings5"] = data["retainedEarnings4"] + data["additionToRetainedEarnings5"];

  // Total Shareholders' Equity (this can be calculated only after Retained earnings is available)
  data["totalShareholdersEquity1"] = data["commonStockAndOtherPaidInCapital1"] + data["retainedEarnings1"];
  data["totalShareholdersEquity2"] = data["commonStockAndOtherPaidInCapital2"] + data["retainedEarnings2"];
  data["totalShareholdersEquity3"] = data["commonStockAndOtherPaidInCapital3"] + data["retainedEarnings3"];
  data["totalShareholdersEquity4"] = data["commonStockAndOtherPaidInCapital4"] + data["retainedEarnings4"];
  data["totalShareholdersEquity5"] = data["commonStockAndOtherPaidInCapital5"] + data["retainedEarnings5"];
}

function calculateCashFlow() {
  // Change in accounts receivable
  data["changeInAccountsReceivable1"] = 0 - data["accountsReceivable1"];
  data["changeInAccountsReceivable2"] = data["accountsReceivable1"] - data["accountsReceivable2"];
  data["changeInAccountsReceivable3"] = data["accountsReceivable2"] - data["accountsReceivable3"];
  data["changeInAccountsReceivable4"] = data["accountsReceivable3"] - data["accountsReceivable4"];
  data["changeInAccountsReceivable5"] = data["accountsReceivable4"] - data["accountsReceivable5"];

  // Change in inventories
  data["changeInInventories1"] = 0 - data["inventories1"];
  data["changeInInventories2"] = data["inventories1"] - data["inventories2"];
  data["changeInInventories3"] = data["inventories2"] - data["inventories3"];
  data["changeInInventories4"] = data["inventories3"] - data["inventories4"];
  data["changeInInventories5"] = data["inventories4"] - data["inventories5"];

  // Change in other current assets
  data["changeInOtherCurrrentAssets1"] = 0 - data["otherCurrentAssets1"];
  data["changeInOtherCurrrentAssets2"] = data["otherCurrentAssets1"] - data["otherCurrentAssets2"];
  data["changeInOtherCurrrentAssets3"] = data["otherCurrentAssets2"] - data["otherCurrentAssets3"];
  data["changeInOtherCurrrentAssets4"] = data["otherCurrentAssets3"] - data["otherCurrentAssets4"];
  data["changeInOtherCurrrentAssets5"] = data["otherCurrentAssets4"] - data["otherCurrentAssets5"];

  // Change in accounts payable
  data["changeInAccountsPayable1"] = data["accountsPayable1"] - 0;
  data["changeInAccountsPayable2"] = data["accountsPayable2"] - data["accountsPayable1"];
  data["changeInAccountsPayable3"] = data["accountsPayable3"] - data["accountsPayable2"];
  data["changeInAccountsPayable4"] = data["accountsPayable4"] - data["accountsPayable3"];
  data["changeInAccountsPayable5"] = data["accountsPayable5"] - data["accountsPayable4"];

  // Change in other current liabilites
  data["changeInOtherCurrentLiabilities1"] = data["otherCurrentLiabilities1"] - 0;
  data["changeInOtherCurrentLiabilities2"] = data["otherCurrentLiabilities2"] - data["otherCurrentLiabilities1"];
  data["changeInOtherCurrentLiabilities3"] = data["otherCurrentLiabilities3"] - data["otherCurrentLiabilities2"];
  data["changeInOtherCurrentLiabilities4"] = data["otherCurrentLiabilities4"] - data["otherCurrentLiabilities3"];
  data["changeInOtherCurrentLiabilities5"] = data["otherCurrentLiabilities5"] - data["otherCurrentLiabilities4"];

  // Total Cash Flow from Operating Activities
  data["operatingCashFlow1"] = data["netIncome1"] + data["depriciationAmortization1"] + data["changeInAccountsReceivable1"] + data["changeInInventories1"] + data["changeInOtherCurrrentAssets1"] + data["changeInAccountsPayable1"] + data["changeInOtherCurrentLiabilities1"];
  data["operatingCashFlow2"] = data["netIncome2"] + data["depriciationAmortization2"] + data["changeInAccountsReceivable2"] + data["changeInInventories2"] + data["changeInOtherCurrrentAssets2"] + data["changeInAccountsPayable2"] + data["changeInOtherCurrentLiabilities2"];
  data["operatingCashFlow3"] = data["netIncome3"] + data["depriciationAmortization3"] + data["changeInAccountsReceivable3"] + data["changeInInventories3"] + data["changeInOtherCurrrentAssets3"] + data["changeInAccountsPayable3"] + data["changeInOtherCurrentLiabilities3"];
  data["operatingCashFlow4"] = data["netIncome4"] + data["depriciationAmortization4"] + data["changeInAccountsReceivable4"] + data["changeInInventories4"] + data["changeInOtherCurrrentAssets4"] + data["changeInAccountsPayable4"] + data["changeInOtherCurrentLiabilities4"];
  data["operatingCashFlow5"] = data["netIncome5"] + data["depriciationAmortization5"] + data["changeInAccountsReceivable5"] + data["changeInInventories5"] + data["changeInOtherCurrrentAssets5"] + data["changeInAccountsPayable5"] + data["changeInOtherCurrentLiabilities5"];

  // Investment in fixed assets
  data["investmentInFixedAssets1"] = 0 - (data["propertyPlantAndEquipment1"] + data["longTermInvestments1"] + data["goodwill1"] + data["intangibleAssets1"] + data["otherAssets1"]);
  data["investmentInFixedAssets2"] = (data["propertyPlantAndEquipment1"] + data["longTermInvestments1"] + data["goodwill1"] + data["intangibleAssets1"] + data["otherAssets1"]) - (data["propertyPlantAndEquipment2"] + data["longTermInvestments2"] + data["goodwill2"] + data["intangibleAssets2"] + data["otherAssets2"]);
  data["investmentInFixedAssets3"] = (data["propertyPlantAndEquipment2"] + data["longTermInvestments2"] + data["goodwill2"] + data["intangibleAssets2"] + data["otherAssets2"]) - (data["propertyPlantAndEquipment3"] + data["longTermInvestments3"] + data["goodwill3"] + data["intangibleAssets3"] + data["otherAssets3"]);
  data["investmentInFixedAssets4"] = (data["propertyPlantAndEquipment3"] + data["longTermInvestments3"] + data["goodwill3"] + data["intangibleAssets3"] + data["otherAssets3"]) - (data["propertyPlantAndEquipment4"] + data["longTermInvestments4"] + data["goodwill4"] + data["intangibleAssets4"] + data["otherAssets4"]);
  data["investmentInFixedAssets5"] = (data["propertyPlantAndEquipment4"] + data["longTermInvestments4"] + data["goodwill4"] + data["intangibleAssets4"] + data["otherAssets4"]) - (data["propertyPlantAndEquipment5"] + data["longTermInvestments5"] + data["goodwill5"] + data["intangibleAssets5"] + data["otherAssets5"]);

  // Total Cash Flow from Investing Activities
  data["investmentCashFlow1"] = data["investmentInFixedAssets1"];
  data["investmentCashFlow2"] = data["investmentInFixedAssets2"];
  data["investmentCashFlow3"] = data["investmentInFixedAssets3"];
  data["investmentCashFlow4"] = data["investmentInFixedAssets4"];
  data["investmentCashFlow5"] = data["investmentInFixedAssets5"];

  // Dividends paid
  data["dividendsPaid1"] = -data["dividends1"];
  data["dividendsPaid2"] = -data["dividends2"];
  data["dividendsPaid3"] = -data["dividends3"];
  data["dividendsPaid4"] = -data["dividends4"];
  data["dividendsPaid5"] = -data["dividends5"];

  // Change in marketable securities
  data["changeInMarketableSecurities1"] = 0 - data["marketableSecurities1"];
  data["changeInMarketableSecurities2"] = data["marketableSecurities1"] - data["marketableSecurities2"];
  data["changeInMarketableSecurities3"] = data["marketableSecurities2"] - data["marketableSecurities3"];
  data["changeInMarketableSecurities4"] = data["marketableSecurities3"] - data["marketableSecurities4"];
  data["changeInMarketableSecurities5"] = data["marketableSecurities4"] - data["marketableSecurities5"];

  // Change in short-term debt
  data["changeInShortTermDebt1"] = data["debtDueForRepayment1"] - 0;
  data["changeInShortTermDebt2"] = data["debtDueForRepayment2"] - data["debtDueForRepayment1"];
  data["changeInShortTermDebt3"] = data["debtDueForRepayment3"] - data["debtDueForRepayment2"];
  data["changeInShortTermDebt4"] = data["debtDueForRepayment4"] - data["debtDueForRepayment3"];
  data["changeInShortTermDebt5"] = data["debtDueForRepayment5"] - data["debtDueForRepayment4"];

  // Change in long-term debt
  data["changeInLongTermDebt1"] = data["longTermDebt1"] - 0;
  data["changeInLongTermDebt2"] = data["longTermDebt2"] - data["longTermDebt1"];
  data["changeInLongTermDebt3"] = data["longTermDebt3"] - data["longTermDebt2"];
  data["changeInLongTermDebt4"] = data["longTermDebt4"] - data["longTermDebt3"];
  data["changeInLongTermDebt5"] = data["longTermDebt5"] - data["longTermDebt4"];

  // Capital raise
  data["capitalRaise1"] = data["commonStockAndOtherPaidInCapital1"] - 0;
  data["capitalRaise2"] = data["commonStockAndOtherPaidInCapital2"] - data["commonStockAndOtherPaidInCapital1"];
  data["capitalRaise3"] = data["commonStockAndOtherPaidInCapital3"] - data["commonStockAndOtherPaidInCapital2"];
  data["capitalRaise4"] = data["commonStockAndOtherPaidInCapital4"] - data["commonStockAndOtherPaidInCapital3"];
  data["capitalRaise5"] = data["commonStockAndOtherPaidInCapital5"] - data["commonStockAndOtherPaidInCapital4"];

  // Total Cash Flow from Financing Activities
  data["financingCashFlow1"] = data["dividendsPaid1"] + data["changeInMarketableSecurities1"] + data["changeInShortTermDebt1"] + data["changeInLongTermDebt1"] + data["capitalRaise1"];
  data["financingCashFlow2"] = data["dividendsPaid2"] + data["changeInMarketableSecurities2"] + data["changeInShortTermDebt2"] + data["changeInLongTermDebt2"] + data["capitalRaise2"];
  data["financingCashFlow3"] = data["dividendsPaid3"] + data["changeInMarketableSecurities3"] + data["changeInShortTermDebt3"] + data["changeInLongTermDebt3"] + data["capitalRaise3"];
  data["financingCashFlow4"] = data["dividendsPaid4"] + data["changeInMarketableSecurities4"] + data["changeInShortTermDebt4"] + data["changeInLongTermDebt4"] + data["capitalRaise4"];
  data["financingCashFlow5"] = data["dividendsPaid5"] + data["changeInMarketableSecurities5"] + data["changeInShortTermDebt5"] + data["changeInLongTermDebt5"] + data["capitalRaise5"];

  // Change in Cash & Equivalents
  data["cashFlow1"] = data["operatingCashFlow1"] + data["investmentCashFlow1"] + data["financingCashFlow1"];
  data["cashFlow2"] = data["operatingCashFlow2"] + data["investmentCashFlow2"] + data["financingCashFlow2"];
  data["cashFlow3"] = data["operatingCashFlow3"] + data["investmentCashFlow3"] + data["financingCashFlow3"];
  data["cashFlow4"] = data["operatingCashFlow4"] + data["investmentCashFlow4"] + data["financingCashFlow4"];
  data["cashFlow5"] = data["operatingCashFlow5"] + data["investmentCashFlow5"] + data["financingCashFlow5"];

  // Cash & equivalents (this can be calculated only after Total Cash Flow is available)
  data["cashAndEquivalents1"] = data["cashFlow1"];
  data["cashAndEquivalents2"] = data["cashAndEquivalents1"] + data["cashFlow2"];
  data["cashAndEquivalents3"] = data["cashAndEquivalents2"] + data["cashFlow3"];
  data["cashAndEquivalents4"] = data["cashAndEquivalents3"] + data["cashFlow4"];
  data["cashAndEquivalents5"] = data["cashAndEquivalents4"] + data["cashFlow5"];

  // Total Current Assets (this can be calculated only after Cash & equivalents is available)
  data["totalCurrentAssets1"] = data["cashAndEquivalents1"] + data["marketableSecurities1"] + data["accountsReceivable1"] + data["inventories1"] + data["otherCurrentAssets1"];
  data["totalCurrentAssets2"] = data["cashAndEquivalents2"] + data["marketableSecurities2"] + data["accountsReceivable2"] + data["inventories2"] + data["otherCurrentAssets2"];
  data["totalCurrentAssets3"] = data["cashAndEquivalents3"] + data["marketableSecurities3"] + data["accountsReceivable3"] + data["inventories3"] + data["otherCurrentAssets3"];
  data["totalCurrentAssets4"] = data["cashAndEquivalents4"] + data["marketableSecurities4"] + data["accountsReceivable4"] + data["inventories4"] + data["otherCurrentAssets4"];
  data["totalCurrentAssets5"] = data["cashAndEquivalents5"] + data["marketableSecurities5"] + data["accountsReceivable5"] + data["inventories5"] + data["otherCurrentAssets5"];

  // Total Assets (this can be calculated only after Total Current Assets is available)
  data["totalAssets1"] = data["totalCurrentAssets1"] + data["propertyPlantAndEquipment1"] + data["accumulatedDepriciationAmortization1"] + data["longTermInvestments1"] + data["goodwill1"] + data["intangibleAssets1"] + data["otherAssets1"];
  data["totalAssets2"] = data["totalCurrentAssets2"] + data["propertyPlantAndEquipment2"] + data["accumulatedDepriciationAmortization2"] + data["longTermInvestments2"] + data["goodwill2"] + data["intangibleAssets2"] + data["otherAssets2"];
  data["totalAssets3"] = data["totalCurrentAssets3"] + data["propertyPlantAndEquipment3"] + data["accumulatedDepriciationAmortization3"] + data["longTermInvestments3"] + data["goodwill3"] + data["intangibleAssets3"] + data["otherAssets3"];
  data["totalAssets4"] = data["totalCurrentAssets4"] + data["propertyPlantAndEquipment4"] + data["accumulatedDepriciationAmortization4"] + data["longTermInvestments4"] + data["goodwill4"] + data["intangibleAssets4"] + data["otherAssets4"];
  data["totalAssets5"] = data["totalCurrentAssets5"] + data["propertyPlantAndEquipment5"] + data["accumulatedDepriciationAmortization5"] + data["longTermInvestments5"] + data["goodwill5"] + data["intangibleAssets5"] + data["otherAssets5"];

}

function calculateValuation() {
  // Discount factors
  data["df1"] = 1;
  data["df2"] = 1 / (1 + data["discountRate"] / 100);
  data["df3"] = 1 / Math.pow(1 + data["discountRate"] / 100, 2);
  data["df4"] = 1 / Math.pow(1 + data["discountRate"] / 100, 3);
  data["df5"] = 1 / Math.pow(1 + data["discountRate"] / 100, 4);

  // Present value of dividends
  data["pv1"] = data["dividends1"] * data["df1"];
  data["pv2"] = data["dividends2"] * data["df2"];
  data["pv3"] = data["dividends3"] * data["df3"];
  data["pv4"] = data["dividends4"] * data["df4"];
  data["pv5"] = data["dividends5"] * data["df5"];

  // Total shareholders' equity at the end of last year
  data["pvOfResidualValue"] = data["totalShareholdersEquity5"] * data["df5"];

  // Net present value of business
  data["npvBusiness"] = -(
      data["capitalRaise1"] * data["df1"] +
      data["capitalRaise2"] * data["df2"] +
      data["capitalRaise3"] * data["df3"] +
      data["capitalRaise4"] * data["df4"] +
      data["capitalRaise5"] * data["df5"]
    ) + data["pv1"] + data["pv2"] + data["pv3"] + data["pv4"] + data["pv5"] + data["pvOfResidualValue"];

  // IRR
  function npv(r) {
    return -(
        data["capitalRaise1"] +
        data["capitalRaise2"] * 1 / (1 + r / 100) +
        data["capitalRaise3"] * 1 / Math.pow(1 + r / 100, 2) +
        data["capitalRaise4"] * 1 / Math.pow(1 + r / 100, 3) +
        data["capitalRaise5"] * 1 / Math.pow(1 + r / 100, 4)
      ) +
      data["dividends1"] +
      data["dividends2"] * 1 / (1 + r / 100) +
      data["dividends3"] * 1 / Math.pow(1 + r / 100, 2) +
      data["dividends4"] * 1 / Math.pow(1 + r / 100, 3) +
      data["dividends5"] * 1 / Math.pow(1 + r / 100, 4) +
      data["totalShareholdersEquity5"] / Math.pow(1 + r / 100, 4);
  }

  for(var i = 0; i <= 1000; i = i + 0.01) {
    if(npv(i) > 0 && npv(i + 1) < 0) {
      data["irr"] = i + 1;
      break;
    }
  }
}

function calculate() {
  calculateBalanceSheet();
  calculateIncomeStatement();
  calculateCashFlow();
  calculateValuation();
}

function format() {
  for(var key in data) {
    // 2 decimal digits
    if(key == "df1" || key == "df2" || key == "df3" || key == "df4" || key == "df5" ||
        key == "irr") {
      data[key] = parseFloat(data[key]).toFixed(2);
    }
    // Integers by default
    else {
      data[key] = parseFloat(data[key]).toFixed(0);
    }
  }
}

function closeErrorClick(sender) {
  $("#" + sender.id).parent().fadeOut(function() {
    $(".e1").removeClass("highlight");
    $(".e2").removeClass("highlight");
    $(".e3").removeClass("highlight");
    $(".e4").removeClass("highlight");
    $(".e5").removeClass("highlight");
    $(".e6").removeClass("highlight");
  });
}

function check() {
  $("#error1").addClass("hidden");
  $("#error2").addClass("hidden");
  $("#error3").addClass("hidden");
  $("#error4").addClass("hidden");
  $("#error5").addClass("hidden");

  $("#success").addClass("hidden");

  // Error 1: negative assets
  if(data["marketableSecurities1"] < 0 || data["marketableSecurities2"] < 0 || data["marketableSecurities3"] < 0 || data["marketableSecurities4"] < 0 || data["marketableSecurities5"] < 0 ||
      data["accountsReceivable1"] < 0 || data["accountsReceivable2"] < 0 || data["accountsReceivable3"] < 0 || data["accountsReceivable4"] < 0 || data["accountsReceivable5"] < 0 ||
      data["inventories1"] < 0 || data["inventories2"] < 0 || data["inventories3"] < 0 || data["inventories4"] < 0 || data["inventories5"] < 0 ||
      data["otherCurrentAssets1"] < 0 || data["otherCurrentAssets2"] < 0 || data["otherCurrentAssets3"] < 0 || data["otherCurrentAssets4"] < 0 || data["otherCurrentAssets5"] < 0 ||
      data["propertyPlantAndEquipment1"] < 0 || data["propertyPlantAndEquipment2"] < 0 || data["propertyPlantAndEquipment3"] < 0 || data["propertyPlantAndEquipment4"] < 0 || data["propertyPlantAndEquipment5"] < 0 ||
      data["longTermInvestments1"] < 0 || data["longTermInvestments2"] < 0 || data["longTermInvestments3"] < 0 || data["longTermInvestments4"] < 0 || data["longTermInvestments5"] < 0 ||
      data["goodwill1"] < 0 || data["goodwill2"] < 0 || data["goodwill3"] < 0 || data["goodwill4"] < 0 || data["goodwill5"] < 0 ||
      data["intangibleAssets1"] < 0 || data["intangibleAssets2"] < 0 || data["intangibleAssets3"] < 0 || data["intangibleAssets4"] < 0 || data["intangibleAssets5"] < 0 ||
      data["otherAssets1"] < 0 || data["otherAssets2"] < 0 || data["otherAssets3"] < 0 || data["otherAssets4"] < 0 || data["otherAssets5"] < 0) {
    $("#error1").fadeIn();
    $("#error1").removeClass("hidden");
    $(".e1").addClass("highlight");

    return;
  }
  else {
    $("#error1").fadeOut();
    $(".e1").removeClass("highlight");
  }

  // Error 2: no investment
  if(data["marketableSecurities1"] == 0 && data["accountsReceivable1"] == 0 && data["inventories1"] == 0 && data["otherCurrentAssets1"] == 0 && data["propertyPlantAndEquipment1"] == 0 && data["longTermInvestments1"] == 0 && data["goodwill1"] == 0 && data["intangibleAssets1"] == 0 && data["otherAssets1"] == 0) {
    $("#error2").fadeIn();
    $("#error2").removeClass("hidden");
    $(".e2").addClass("highlight");

    return;
  }
  else {
    $("#error2").fadeOut();
    $(".e2").removeClass("highlight");
  }

  // Error 3: no sales or costs
  if((data["netSales1"] == 0 || (data["costOfGoodsSold1"] == 0 && data["sellingGeneralAndOtherExpenses1"] == 0 && data["researchAndDevelopment1"] == 0 && data["otherOperatingExpenses1"] == 0)) &&
      (data["netSales2"] == 0 || (data["costOfGoodsSold2"] == 0 && data["sellingGeneralAndOtherExpenses2"] == 0 && data["researchAndDevelopment2"] == 0 && data["otherOperatingExpenses2"] == 0)) &&
      (data["netSales3"] == 0 || (data["costOfGoodsSold3"] == 0 && data["sellingGeneralAndOtherExpenses3"] == 0 && data["researchAndDevelopment3"] == 0 && data["otherOperatingExpenses3"] == 0)) &&
      (data["netSales4"] == 0 || (data["costOfGoodsSold4"] == 0 && data["sellingGeneralAndOtherExpenses4"] == 0 && data["researchAndDevelopment4"] == 0 && data["otherOperatingExpenses4"] == 0)) &&
      (data["netSales5"] == 0 || (data["costOfGoodsSold5"] == 0 && data["sellingGeneralAndOtherExpenses5"] == 0 && data["researchAndDevelopment5"] == 0 && data["otherOperatingExpenses5"] == 0))) {
    $("#error3").fadeIn();
    $("#error3").removeClass("hidden");
    $(".e3").addClass("highlight");

    return;
  }
  else {
    $("#error3").fadeOut();
    $(".e3").removeClass("highlight");
  }

  // Error 4: no piad-in capital
  if(data["commonStockAndOtherPaidInCapital1"] == 0 || data["commonStockAndOtherPaidInCapital2"] == 0 || data["commonStockAndOtherPaidInCapital3"] == 0 || data["commonStockAndOtherPaidInCapital4"] == 0 || data["commonStockAndOtherPaidInCapital5"] == 0) {
    $("#error4").fadeIn();
    $("#error4").removeClass("hidden");
    $(".e4").addClass("highlight");

    return;
  }
  else {
    $("#error4").fadeOut();
    $(".e4").removeClass("highlight");
  }

  // Error 5: not enough cash
  if(data["cashAndEquivalents1"] < 0 || data["cashAndEquivalents2"] < 0 || data["cashAndEquivalents3"] < 0 || data["cashAndEquivalents4"] < 0 || data["cashAndEquivalents5"] < 0) {
    $("#error5").fadeIn();
    $("#error5").removeClass("hidden");
    $(".e5").addClass("highlight");

    return;
  }
  else {
    $("#error5").fadeOut();
    $(".e5").removeClass("highlight");
  }

  // Success
  $("#success").fadeIn();
  $("#success").removeClass("hidden");
}

function bind() {
  // Read input
  bindInput();

  // Create output
  validate();
  calculate();
  format();

  // Display output
  bindOutput();
}

function saveBusinessPlan() {
  var a = document.createElement("a");
  var file = new File([JSON.stringify(data, null, 2)], {type : 'application/json'});
  a.href = URL.createObjectURL(file);
  a.download = "Business-Plan.json";
  a.click();
}

function fileSelected() {
  var file = document.getElementById("file").files[0];

  var reader = new FileReader();
  reader.onloadend = function(event) {
    if (event.target.readyState == FileReader.DONE) {
      try {
        data = JSON.parse(event.target.result);
      }
      catch(e) {
        $("#error7").fadeIn();
        $("#error7").removeClass("hidden");

        return;
      }

      bindInputInverse();
      bindOutput();
    }
  };

  reader.readAsText(file);
}

function loadBusinessPlan() {
  if(!confirm("Are you sure you want load the file? All data you entered will be lost.")) {
    return;
  }

  document.getElementById("file").click();
}

$(document).ready(function() {
  $(".year1").text(year);
  $(".year2").text(year + 1);
  $(".year3").text(year + 2);
  $(".year4").text(year + 3);
  $(".year5").text(year + 4);

  bind();

  $("input[type='number']").keyup(bind);

  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
});
