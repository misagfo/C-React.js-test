using Microsoft.AspNetCore.Mvc;
using System.Text.Json.Serialization; 

namespace FCamara.CommissionCalculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommisionController : ControllerBase
    {
        [ProducesResponseType(typeof(CommissionCalculationResponse), 200)]
        [HttpPost]
        public IActionResult Calculate(CommissionCalculationRequest calculationRequest)
        {
           
            decimal fcamaraLocalRate = 0.20m;
            decimal fcamaraForeignRate = 0.35m;
            decimal competitorLocalRate = 0.02m;
            decimal competitorForeignRate = 0.0755m;

        
            decimal fcamaraLocalCommission = fcamaraLocalRate * calculationRequest.LocalSalesCount * calculationRequest.AverageSaleAmount;
            decimal fcamaraForeignCommission = fcamaraForeignRate * calculationRequest.ForeignSalesCount * calculationRequest.AverageSaleAmount;
            decimal fcamaraTotalCommission = fcamaraLocalCommission + fcamaraForeignCommission;

            decimal competitorLocalCommission = competitorLocalRate * calculationRequest.LocalSalesCount * calculationRequest.AverageSaleAmount;
            decimal competitorForeignCommission = competitorForeignRate * calculationRequest.ForeignSalesCount * calculationRequest.AverageSaleAmount;
            decimal competitorTotalCommission = competitorLocalCommission + competitorForeignCommission;

          
            return Ok(new CommissionCalculationResponse()
            {
                FCamaraCommissionAmount = fcamaraTotalCommission,
                CompetitorCommissionAmount = competitorTotalCommission
            });
        }
    }

    public class CommissionCalculationRequest
    {
       
        [JsonPropertyName("localSalesCount")]
        public int LocalSalesCount { get; set; }
        
        [JsonPropertyName("foreignSalesCount")]
        public int ForeignSalesCount { get; set; }
        
        [JsonPropertyName("averageSalesAmount")]
        public decimal AverageSaleAmount { get; set; }
    }

    public class CommissionCalculationResponse
    {
      
        [JsonPropertyName("fcamaraCommission")]
        public decimal FCamaraCommissionAmount { get; set; }

        [JsonPropertyName("competitorCommission")]
        public decimal CompetitorCommissionAmount { get; set; }
    }
}