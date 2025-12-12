#!/usr/bin/env python3
"""
Advanced Web Scraper - Uses Playwright for dynamic content scraping
"""

import json
import asyncio
from datetime import datetime
from typing import List, Dict, Any
import os

class AdvancedScraper:
    def __init__(self, config_path: str = "/home/ubuntu/million_hunter/config.json"):
        with open(config_path, 'r') as f:
            self.config = json.load(f)
        
        self.filters = self.config['filters']
        self.output_dir = "/home/ubuntu/million_hunter/data"
        
    async def scrape_bizbuysell_detailed(self, max_pages: int = 10) -> List[Dict[str, Any]]:
        """
        Scrape BizBuySell with detailed business information
        Uses Playwright for JavaScript-rendered content
        """
        from playwright.async_api import async_playwright
        
        listings = []
        
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            
            # Search for businesses in target sectors
            for sector in self.filters['sectors']:
                search_url = f"https://www.bizbuysell.com/businesses-for-sale/{sector}/"
                
                try:
                    await page.goto(search_url, wait_until='networkidle')
                    await asyncio.sleep(2)  # Allow dynamic content to load
                    
                    # Extract listing cards
                    listing_cards = await page.query_selector_all('.business-card, .listing-item, [data-testid="listing-card"]')
                    
                    for card in listing_cards[:50]:  # Limit per sector
                        try:
                            # Extract business details
                            title_elem = await card.query_selector('h2, h3, .title, .business-name')
                            title = await title_elem.inner_text() if title_elem else "N/A"
                            
                            price_elem = await card.query_selector('.price, .asking-price, [data-testid="price"]')
                            price_text = await price_elem.inner_text() if price_elem else "N/A"
                            
                            revenue_elem = await card.query_selector('.revenue, [data-testid="revenue"]')
                            revenue_text = await revenue_elem.inner_text() if revenue_elem else "N/A"
                            
                            cashflow_elem = await card.query_selector('.cash-flow, .cashflow, [data-testid="cashflow"]')
                            cashflow_text = await cashflow_elem.inner_text() if cashflow_elem else "N/A"
                            
                            location_elem = await card.query_selector('.location, [data-testid="location"]')
                            location = await location_elem.inner_text() if location_elem else "N/A"
                            
                            link_elem = await card.query_selector('a[href*="/business/"]')
                            detail_url = await link_elem.get_attribute('href') if link_elem else ""
                            if detail_url and not detail_url.startswith('http'):
                                detail_url = f"https://www.bizbuysell.com{detail_url}"
                            
                            listing = {
                                'source': 'bizbuysell',
                                'title': title.strip(),
                                'sector': sector,
                                'asking_price': price_text.strip(),
                                'revenue': revenue_text.strip(),
                                'cash_flow': cashflow_text.strip(),
                                'location': location.strip(),
                                'url': detail_url,
                                'scan_date': datetime.now().isoformat(),
                                'status': 'active'
                            }
                            
                            listings.append(listing)
                            
                        except Exception as e:
                            print(f"Error extracting card data: {str(e)}")
                            continue
                    
                    print(f"Scraped {len(listing_cards)} listings from {sector}")
                    
                except Exception as e:
                    print(f"Error scraping {sector}: {str(e)}")
                    continue
            
            await browser.close()
        
        return listings
    
    async def scrape_bizquest_detailed(self) -> List[Dict[str, Any]]:
        """Scrape BizQuest with detailed information"""
        from playwright.async_api import async_playwright
        
        listings = []
        
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            
            # BizQuest search by revenue and cash flow
            search_url = "https://www.bizquest.com/businesses-for-sale/"
            
            try:
                await page.goto(search_url, wait_until='networkidle')
                await asyncio.sleep(2)
                
                # Apply filters (revenue, cash flow, location)
                # This would require interacting with filter elements
                
                # Extract listings
                listing_items = await page.query_selector_all('.listing, .business-listing')
                
                for item in listing_items[:50]:
                    try:
                        title = await item.query_selector('h2, h3, .title')
                        title_text = await title.inner_text() if title else "N/A"
                        
                        listing = {
                            'source': 'bizquest',
                            'title': title_text.strip(),
                            'scan_date': datetime.now().isoformat(),
                            'status': 'active'
                        }
                        
                        listings.append(listing)
                        
                    except Exception as e:
                        continue
                
            except Exception as e:
                print(f"Error scraping BizQuest: {str(e)}")
            
            await browser.close()
        
        return listings
    
    def parse_currency(self, text: str) -> float:
        """Parse currency string to float"""
        if not text or text == "N/A":
            return 0.0
        
        # Remove currency symbols and commas
        cleaned = text.replace('$', '').replace(',', '').replace('USD', '').strip()
        
        # Handle K/M suffixes
        if 'M' in cleaned.upper():
            return float(cleaned.upper().replace('M', '')) * 1_000_000
        elif 'K' in cleaned.upper():
            return float(cleaned.upper().replace('K', '')) * 1_000
        
        try:
            return float(cleaned)
        except:
            return 0.0
    
    def filter_by_criteria(self, listings: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Filter listings based on configured criteria"""
        filtered = []
        
        for listing in listings:
            # Parse financial metrics
            revenue = self.parse_currency(listing.get('revenue', '0'))
            cash_flow = self.parse_currency(listing.get('cash_flow', '0'))
            
            # Apply filters
            if (self.filters['revenue_min'] <= revenue <= self.filters['revenue_max'] and
                self.filters['cash_flow_min'] <= cash_flow <= self.filters['cash_flow_max']):
                
                # Check location filter
                location = listing.get('location', '').upper()
                if any(state in location for state in self.filters['geo']):
                    filtered.append(listing)
        
        return filtered
    
    async def run_full_scan(self) -> List[Dict[str, Any]]:
        """Execute complete scan across all sources"""
        all_listings = []
        
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Starting advanced market scan...")
        
        # Scan BizBuySell
        print("Scanning BizBuySell...")
        bizbuysell_listings = await self.scrape_bizbuysell_detailed()
        all_listings.extend(bizbuysell_listings)
        
        # Scan BizQuest
        print("Scanning BizQuest...")
        bizquest_listings = await self.scrape_bizquest_detailed()
        all_listings.extend(bizquest_listings)
        
        # Filter by criteria
        filtered_listings = self.filter_by_criteria(all_listings)
        
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Scan complete.")
        print(f"Total listings found: {len(all_listings)}")
        print(f"Filtered listings: {len(filtered_listings)}")
        
        return filtered_listings
    
    def save_to_json(self, listings: List[Dict[str, Any]], filename: str = None):
        """Save listings to JSON file"""
        if not filename:
            filename = f"listings_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        filepath = os.path.join(self.output_dir, filename)
        
        with open(filepath, 'w') as f:
            json.dump(listings, f, indent=2)
        
        print(f"Saved {len(listings)} listings to {filepath}")
        return filepath

async def main():
    """Main execution"""
    scraper = AdvancedScraper()
    listings = await scraper.run_full_scan()
    scraper.save_to_json(listings)

if __name__ == "__main__":
    asyncio.run(main())
