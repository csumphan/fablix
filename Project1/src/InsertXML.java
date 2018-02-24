import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.*;

import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

public class InsertXML {
	public static void main(String args[]) {
		String loginUser = "root";
        String loginPasswd = "cs122bfablix";
        String loginUrl = "jdbc:mysql://localhost:3306/moviedb";
        
        SAXCastParser scp = new SAXCastParser();
        Map<String, JsonObject> moviesObject = scp.getData();
        
        
        try {
            //Class.forName("org.gjt.mm.mysql.Driver");
        		Class.forName("com.mysql.jdbc.Driver").newInstance();

            Connection dbcon = DriverManager.getConnection(loginUrl, loginUser, loginPasswd);
            
            for (Map.Entry<String, JsonObject> entry : moviesObject.entrySet()) {
            		String movieId = entry.getKey();
            		JsonObject movieInfo = entry.getValue();
            		
            		JsonArray genresArray = movieInfo.get("genres");
            		JsonArray starsArray = movieInfo.get("stars");
            }
            Statement addStatement = dbcon.createStatement();
            
            String addMovieQuery = "CALL add_movie('" + movieId + "', '" + title + "', " + year + ", '" + director + "', '" + star + "', '" + genre + "')";
            
            ResultSet addMovie_rs = addStatement.executeQuery(addMovieQuery);
            
            String verifyQuery = "SELECT * FROM movies WHERE id = '" + movieId + "'"; 
            
            Statement verifyStatement = dbcon.createStatement();
            
            ResultSet verify_rs = verifyStatement.executeQuery(verifyQuery);
            
          
            addMovie_rs.close();
            verify_rs.close();
            addStatement.close();
            verifyStatement.close();
            dbcon.close();
        } catch (SQLException ex) {
            while (ex != null) {
                System.out.println("SQL Exception:  " + ex.getMessage());
                ex = ex.getNextException();
            }
        }
	}
}
