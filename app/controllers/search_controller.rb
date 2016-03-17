class SearchController < ApplicationController
  require 'rsolr'
  require 'wombat'
  def index
    
  end
  def get_search_results    
    @qterm=(params[:qterm]!="" && params[:qterm]!=nil) ? params[:qterm] : "*:*"    
    solr = RSolr.connect :url => 'http://localhost:8983/solr/collection1'
    @search_data=Hash.new
    @search_data = solr.get 'select', :params => {:q => @qterm, :wt=> :ruby, :rows=>100, :sort=>"description desc"}    
    hash=Hash.new
    @search_result=Array.new    
    @search_data["response"]["docs"].each{|doc|      
      hash={:url=>doc["url"], :desc=>doc["description"], :name=>doc['name'], :id=>doc['id']}      
      @search_result.push(hash)
    }   
    #This method is for adding document to Solr
    #add_doc(solr)
    # This method is for crawling Data
    #crawl(solr)
    render :json=>@search_result
  end
  
  def add_doc(solr,crawl_data_array)   
    crawl_data_array.each do|doc|     
    begin
      solr.add(:id=>doc[:id], :url=>doc[:url], :name=>doc[:title],:description=>doc[:description])
      solr.commit
    rescue Exception =>  e
    end
  end
  
end
def crawl(solr)    
  require 'anemone'
  crawl_data_array=Array.new    
  Anemone.crawl("https://twitter.com/login?lang=en", :depth_limit => 0) do |anemone|
    titles = []
    content=[]
    i=37   
    anemone.on_every_page do |page|   
      begin   
        
        crawl_data_array=crawl_data_array.push({:id=>i, :url=>page.url.to_s, :title=>page.doc.at('title').inner_html, :description=>page.doc.at("meta[name='description']")['content']})
        i=i+1
      rescue Exception => e 
      end      
    end    
  end
  add_doc(solr,crawl_data_array)
end
end
