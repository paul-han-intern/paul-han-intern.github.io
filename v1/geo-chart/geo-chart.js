document.addEventListener("DOMContentLoaded", () => {
  function tooltipHtml(name, data) {
    return "<h4>"+name+"</h4><table>"+
      "<tr><td>Accounts</td><td>"+(data.accounts)+"</td></tr>"+
      "<tr><td>Contacts</td><td>"+(data.contacts)+"</td></tr>"+
      "</table>";
  }
  
  var sampleData = {};
  ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
  "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
  "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
  "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
  "WI", "MO", "AR", "OK", "KS", "LS", "VA"]
    .forEach(function(data){ 
      var accounts=Math.round(1000*Math.random()),
        contacts=Math.round(1000*Math.random());
      sampleData[data]={accounts: accounts, contacts: contacts, color: d3.interpolate("#168DC6", "#F47521")(accounts/1000)};
    });

  uStates.draw("#statesvg", sampleData, tooltipHtml);
  d3.select(self.frameElement).style("height", "600px");
});