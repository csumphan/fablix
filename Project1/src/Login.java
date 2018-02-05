

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.PrintWriter;
import com.google.gson.JsonObject;

/**
 * Servlet implementation class Login
 */
@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Login() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at this URL, which is /Login, where login authentication works: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String loginUser = "root";
        String loginPasswd = "cs122bfablix";
        String loginUrl = "jdbc:mysql://localhost:3306/moviedb";
        
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        
        response.setContentType("application/json"); // Response mime type
        
        PrintWriter out = response.getWriter();
        
        try {
            //Class.forName("org.gjt.mm.mysql.Driver");
        		Class.forName("com.mysql.jdbc.Driver").newInstance();

            Connection dbcon = DriverManager.getConnection(loginUrl, loginUser, loginPasswd);
            
            // Declare our statement
            Statement statement = dbcon.createStatement();
            
            // Check if email exists
            String existsQuery = "SELECT * FROM customers WHERE email = '" + email + "' AND password = '" + password + "'";
            
            ResultSet rs = statement.executeQuery(existsQuery);
            
            if (rs.next()) {
            		JsonObject userInfo = new JsonObject();
            		
            		String m_id = rs.getString("id");
            		String m_firstName = rs.getString("firstName");
            		String m_lastName = rs.getString("lastName");
            		String m_ccId = rs.getString("ccId");
            		String m_address = rs.getString("address");
            		String m_email = rs.getString("email");
            		String m_password = rs.getString("password");
            		
            		userInfo.addProperty("id", m_id);
            		userInfo.addProperty("firstName", m_firstName);
            		userInfo.addProperty("lastName", m_lastName);
            		userInfo.addProperty("ccId", m_ccId);
            		userInfo.addProperty("address", m_address);
            		userInfo.addProperty("email", m_email);
            		userInfo.addProperty("password", m_password);
            		
            		request.getSession().setAttribute("id", m_id);
            		request.getSession().setAttribute("firstName", m_firstName);
            		request.getSession().setAttribute("lastName", m_lastName);
            		
            		out.write(userInfo.toString());
            }
            
            else {
            		JsonObject errorInfo = new JsonObject();
            		errorInfo.addProperty("error", "Incorrect email/password");
            		
            		out.write(errorInfo.toString());
            }
            
            rs.close();
            statement.close();
            dbcon.close();
        } catch (SQLException ex) {
            while (ex != null) {
                System.out.println("SQL Exception:  " + ex.getMessage());
                ex = ex.getNextException();
            } // end while
        } // end catch SQLException
        catch (java.lang.Exception ex) {
            out.println("<HTML>" + "<HEAD><TITLE>" + "MovieDB: Error" + "</TITLE></HEAD>\n<BODY>"
                    + "<P>SQL error in doGet: " + ex.getMessage() + "</P></BODY></HTML>");
            return;
        }
        out.close();
		doGet(request, response);
	}

}