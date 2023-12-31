namespace HydroFlowProject.ViewModels;

public class SessionViewModel
{
    public SessionViewModel() {}
    
    public string? SessionId { get; set; }
    public int SessionUserId { get; set; }
    public DateTime? SessionCreateDate { get; set; }
    public DateTime? SessionExpireDate { get; set; }
    public bool SessionIsValid { get; set; }
    public string? AllowedRole { get; set; }
}