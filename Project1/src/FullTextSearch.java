

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

/**
 * Servlet implementation class FullTextSearch
 */
@WebServlet("/FullTextSearch")
public class FullTextSearch extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public FullTextSearch() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String loginUser = "root";
        String loginPasswd = "cs122bfablix";
        String loginUrl = "jdbc:mysql://localhost:3306/moviedb";
        
        response.setContentType("application/json"); // Response mime type
        
        PrintWriter out = response.getWriter();
		
		JsonObject searchTerms = new JsonObject();
		
		String queryString = request.getQueryString();
		
		// Split queryString by &
		if (queryString != "") {
			String[] keyValues = queryString.split("&");
			
			List<String> keyValuesList = new ArrayList<String>(Arrays.asList(keyValues));
			
			for (int i = 0; i < keyValuesList.size(); ++i) {
				// For each element, split by = to get key-value pair
				String[] kv = keyValues[i].split("=");
				String key = kv[0];
				String value = kv[1];
				value = java.net.URLDecoder.decode(value, "UTF-8");
				searchTerms.addProperty(key, value);
				
			}
		}
		
		JsonElement type = searchTerms.get("type");
		JsonElement searchInput = searchTerms.get("query");
		
		String[] titleStringSplit = searchInput.getAsString().split("\\+");
		System.out.println(searchInput.getAsString());
		
		for (int i = 0; i < titleStringSplit.length; i++) {
			titleStringSplit[i] = "+" + titleStringSplit[i] + "*";
			System.out.println(titleStringSplit[i]);
		}
		
		String matchString = String.join(" ", titleStringSplit);
		
		System.out.println(matchString);
		
		try {
			Class.forName("com.mysql.jdbc.Driver").newInstance();

            Connection dbcon = DriverManager.getConnection(loginUrl, loginUser, loginPasswd);
            
            if (type.getAsString().equals("movie")) {
	        		String searchQuery = "SELECT * FROM movies JOIN ratings ON movies.id = ratings.movieId";
	        		searchQuery = "SELECT * FROM (" + searchQuery + ") AS alias WHERE MATCH(title) AGAINST ('" + matchString +"' IN BOOLEAN MODE)";
	        		
	        		System.out.println(searchQuery);
	        		
	        		Statement statement = dbcon.createStatement();
	            ResultSet rs = statement.executeQuery(searchQuery);
	            
	            JsonArray moviesArray = new JsonArray();
	            
	            while (rs.next()) {
	            		JsonObject movie = new JsonObject();
	            		
	                String m_id = rs.getString("id");
	                String m_title = rs.getString("title");
	                String m_year = rs.getString("year");
	                String m_director = rs.getString("director");
	                String m_rating = rs.getString("rating");
	                String m_votes = rs.getString("numVotes");
	                
	                String stars_query = "SELECT name FROM (SELECT starId FROM stars_in_movies WHERE stars_in_movies.movieId = \"" + m_id + "\") AS starIds JOIN stars ON starIds.starId = stars.id";
	                String genres_query = "SELECT name FROM (SELECT genreId FROM genres_in_movies WHERE genres_in_movies.movieId = \"" + m_id + "\") AS genreIds JOIN genres ON genreIds.genreId = genres.id";
	                
	                Statement stars_statement = dbcon.createStatement();
	                Statement genres_statement = dbcon.createStatement();
	                
	                ResultSet rs_stars = stars_statement.executeQuery(stars_query);
	                ResultSet rs_genres = genres_statement.executeQuery(genres_query);
	                
	                String m_stars = "";
	                String m_genres = "";
	                
	                while (rs_stars.next()) {
		                	String star_name = rs_stars.getString("name");
		                	m_stars += star_name + ", ";    	
	                }
	    
	                
	                while (rs_genres.next()) {
		                	String genre_name = rs_genres.getString("name");
		                	m_genres += genre_name + ", ";
	                }
	                
	                m_stars = m_stars.trim();
	                m_stars = m_stars.substring(0, m_stars.length() - 1);
	                m_genres = m_genres.trim();
	                m_genres = m_genres.substring(0, m_genres.length() - 1);
	                
	                movie.addProperty("id", m_id);
	                movie.addProperty("title", m_title);
	                movie.addProperty("year", m_year);
	                movie.addProperty("director", m_director);
	                movie.addProperty("genres", m_genres);
	                movie.addProperty("stars", m_stars);
	                movie.addProperty("rating", m_rating);
	                movie.addProperty("votes", m_votes);
	                
	                moviesArray.add(movie);
	         
	                rs_stars.close();
	                rs_genres.close();
	                
	                stars_statement.close();
	                genres_statement.close();
	                
	            }
	            out.write(moviesArray.toString());
	            
	            rs.close();
	            statement.close();
            }
            else {
            		String searchQuery = "SELECT * FROM stars AS alias WHERE MATCH(name) AGAINST ('" + matchString +"' IN BOOLEAN MODE)";
            		
            		Statement statement = dbcon.createStatement();
            	    ResultSet rs = statement.executeQuery(searchQuery);
            	    
            	    JsonArray starsArray = new JsonArray();
            	    
           
            	    
            	    while (rs.next()) {
            	    		JsonObject starInfo = new JsonObject();
            	    	
            	    		String name = rs.getString("name");
            	    		String birthYear = rs.getString("birthYear");
            	    		starInfo.addProperty("name", name);
            	    		starInfo.addProperty("birthYear", birthYear);
            	    		
            	    		starsArray.add(starInfo);
            	    }
            	    
            	    out.write(starsArray.toString());
                
            	    rs.close();
            	    statement.close();
            }
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
		
        
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
