namespace API.Interfaces;

public interface IJwt
{
    public string GenerarToken(string email);
}